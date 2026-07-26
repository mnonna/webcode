import { verifyRecaptchaProof } from '../../../src/lib/recaptcha';

const MAILER_URL = 'https://mailer.webcode.com.pl/mail';
const RECAPTCHA_ACTION = 'contact_form';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const recaptchaProof = formData.get('recaptchaProof');

    if (
      typeof recaptchaProof !== 'string' ||
      !verifyRecaptchaProof(recaptchaProof, RECAPTCHA_ACTION)
    ) {
      return Response.json(
        { error: 'Weryfikacja reCAPTCHA nie powiodła się.' },
        { status: 403 },
      );
    }

    formData.delete('recaptchaProof');

    const response = await fetch(MAILER_URL, {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    });

    if (!response.ok) {
      return Response.json(
        { error: 'Nie udało się wysłać wiadomości.' },
        { status: response.status },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact form mailer error:', error);

    return Response.json(
      { error: 'Usługa wysyłania wiadomości jest chwilowo niedostępna.' },
      { status: 502 },
    );
  }
}
