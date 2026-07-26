'use client';

import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type RecaptchaVerification = {
  success: true;
  score: number;
  proof: string;
};

type RecaptchaErrorResponse = {
  error?: string;
};

export function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verify = useCallback(
    async (action = 'form_submit'): Promise<RecaptchaVerification> => {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA nie jest jeszcze gotowa. Spróbuj ponownie.');
      }

      const token = await executeRecaptcha(action);
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
    [executeRecaptcha],
  );

  return { verify, isReady: Boolean(executeRecaptcha) };
}
