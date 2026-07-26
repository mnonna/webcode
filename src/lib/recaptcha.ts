import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

const GOOGLE_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const DEFAULT_MIN_SCORE = 0.5;
const PROOF_TTL_SECONDS = 120;

type GoogleRecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
};

type RecaptchaProofPayload = {
  action: string;
  score: number;
  exp: number;
};

export type RecaptchaVerificationResult =
  | {
      success: true;
      score: number;
      action: string;
      hostname?: string;
    }
  | {
      success: false;
      error: string;
    };

function getSecretKey() {
  const secretKey = process.env.RECAPTCHA_PRIVATE_KEY;

  if (!secretKey) {
    throw new Error('Brak klucza recaptcha.');
  }

  return secretKey;
}

function getMinScore() {
  const configuredScore = Number(process.env.RECAPTCHA_MIN_SCORE);

  return Number.isFinite(configuredScore)
    ? configuredScore
    : DEFAULT_MIN_SCORE;
}

function sign(value: string) {
  return createHmac('sha256', getSecretKey()).update(value).digest('base64url');
}

export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string,
): Promise<RecaptchaVerificationResult> {
  const body = new URLSearchParams({
    secret: getSecretKey(),
    response: token,
  });
  const response = await fetch(GOOGLE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      success: false,
      error: 'Usługa reCAPTCHA jest chwilowo niedostępna.',
    };
  }

  const result = (await response.json()) as GoogleRecaptchaResponse;
  const score = result.score ?? 0;

  if (!result.success || result.action !== expectedAction) {
    return {
      success: false,
      error: 'Weryfikacja reCAPTCHA nie powiodła się.',
    };
  }

  if (score < getMinScore()) {
    return {
      success: false,
      error: 'Weryfikacja antyspamowa odrzuciła zgłoszenie.',
    };
  }

  return {
    success: true,
    score,
    action: expectedAction,
    hostname: result.hostname,
  };
}

export function createRecaptchaProof(action: string, score: number) {
  const payload: RecaptchaProofPayload = {
    action,
    score,
    exp: Math.floor(Date.now() / 1000) + PROOF_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    'base64url',
  );

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyRecaptchaProof(proof: string, expectedAction: string) {
  const [encodedPayload, signature] = proof.split('.');

  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = sign(encodedPayload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as RecaptchaProofPayload;

    return (
      payload.action === expectedAction &&
      payload.score >= getMinScore() &&
      payload.exp >= Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
