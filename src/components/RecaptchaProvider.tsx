'use client';

import { ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

type RecaptchaProviderProps = {
  children: ReactNode;
  siteKey?: string;
};

export default function RecaptchaProvider({
  children,
  siteKey,
}: RecaptchaProviderProps) {
  if (!siteKey) {
    return children;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{ async: true, defer: true, appendTo: 'head' }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
