'use client';

import { createContext, ReactNode, useContext } from 'react';

type RecaptchaProviderProps = {
  children: ReactNode;
  siteKey?: string;
};

const RecaptchaSiteKeyContext = createContext<string | undefined>(undefined);

export function useRecaptchaSiteKey() {
  return useContext(RecaptchaSiteKeyContext);
}

export default function RecaptchaProvider({
  children,
  siteKey,
}: RecaptchaProviderProps) {
  return (
    <RecaptchaSiteKeyContext.Provider value={siteKey}>
      {children}
    </RecaptchaSiteKeyContext.Provider>
  );
}
