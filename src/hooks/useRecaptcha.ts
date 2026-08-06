'use client';

import { useCallback } from 'react';
import { useRecaptchaSiteKey } from '../components/RecaptchaProvider';

type RecaptchaVerification = {
  success: true;
  score: number;
  proof: string;
};

type RecaptchaErrorResponse = {
  error?: string;
};

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const RECAPTCHA_SCRIPT_ID = 'google-recaptcha';
let recaptchaLoadPromise: Promise<Grecaptcha> | null = null;

function loadRecaptcha(siteKey: string): Promise<Grecaptcha> {
  if (window.grecaptcha) {
    return new Promise((resolve) => {
      window.grecaptcha?.ready(() => resolve(window.grecaptcha as Grecaptcha));
    });
  }

  if (recaptchaLoadPromise) {
    return recaptchaLoadPromise;
  }

  recaptchaLoadPromise = new Promise<Grecaptcha>((resolve, reject) => {
    document.getElementById(RECAPTCHA_SCRIPT_ID)?.remove();

    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.onload = () => {
      if (!window.grecaptcha) {
        reject(new Error('Nie udało się uruchomić reCAPTCHA.'));
        return;
      }

      window.grecaptcha.ready(() => resolve(window.grecaptcha as Grecaptcha));
    };
    script.onerror = () => reject(new Error('Nie udało się załadować reCAPTCHA.'));
    document.head.appendChild(script);
  }).catch((error) => {
    recaptchaLoadPromise = null;
    document.getElementById(RECAPTCHA_SCRIPT_ID)?.remove();
    throw error;
  });

  return recaptchaLoadPromise;
}

export function useRecaptcha() {
  const siteKey = useRecaptchaSiteKey();

  const verify = useCallback(
    async (action = 'form_submit'): Promise<RecaptchaVerification> => {
      if (!siteKey) {
        throw new Error('Brak klucza reCAPTCHA.');
      }

      const recaptcha = await loadRecaptcha(siteKey);
      const token = await recaptcha.execute(siteKey, { action });
      const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action }),
      });
      const data = (await response.json()) as
        | RecaptchaVerification
        | RecaptchaErrorResponse;

      if (!response.ok || !('success' in data)) {
        throw new Error(
          'error' in data && data.error
            ? data.error
            : 'Weryfikacja reCAPTCHA nie powiodła się.',
        );
      }

      return data;
    },
    [siteKey],
  );

  return { verify };
}
