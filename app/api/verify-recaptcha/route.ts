import {
  createRecaptchaProof,
  verifyRecaptchaToken,
} from '../../../src/lib/recaptcha';

type VerifyRequest = {
  token?: unknown;
  action?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyRequest;

    if (
      typeof body.token !== 'string' ||
      !body.token ||
      typeof body.action !== 'string' ||
      !body.action
    ) {
      return Response.json(
        { error: 'Token i akcja reCAPTCHA są wymagane.' },
        { status: 400 },
      );
    }

    const verification = await verifyRecaptchaToken(body.token, body.action);

    if (!verification.success) {
      return Response.json(
        { error: verification.error },
        { status: 400 },
      );
    }

    return Response.json({
      success: true,
      score: verification.score,
      proof: createRecaptchaProof(
        verification.action,
        verification.score,
      ),
    });
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);

    return Response.json(
      { error: 'Nie udało się zweryfikować reCAPTCHA.' },
      { status: 500 },
    );
  }
}
