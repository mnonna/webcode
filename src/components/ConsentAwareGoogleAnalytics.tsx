"use client";

import { useEffect } from "react";

type KookiOkConsent = {
  regulation?: string;
  statistics?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_COOKIE_NAME = "ag_consent";
const ANALYTICS_SCRIPT_ID = "google-analytics";

function readConsent(): KookiOkConsent | null {
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!cookie) {
    return null;
  }

  try {
    return JSON.parse(
      decodeURIComponent(cookie.slice(CONSENT_COOKIE_NAME.length + 1)),
    ) as KookiOkConsent;
  } catch {
    return null;
  }
}

function hasExplicitStatisticsConsent() {
  const consent = readConsent();

  return Boolean(
    consent?.statistics &&
      consent.regulation &&
      consent.regulation !== "none",
  );
}

function loadGoogleAnalytics(measurementId: string) {
  if (document.getElementById(ANALYTICS_SCRIPT_ID)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.id = ANALYTICS_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export default function ConsentAwareGoogleAnalytics({
  measurementId,
}: {
  measurementId: string;
}) {
  useEffect(() => {
    const loadWhenAllowed = () => {
      if (hasExplicitStatisticsConsent()) {
        loadGoogleAnalytics(measurementId);
      }
    };

    loadWhenAllowed();
    window.addEventListener("Kookiok:consentUpdate", loadWhenAllowed);
    window.addEventListener("KookiokOnConsentReady", loadWhenAllowed);

    return () => {
      window.removeEventListener("Kookiok:consentUpdate", loadWhenAllowed);
      window.removeEventListener("KookiokOnConsentReady", loadWhenAllowed);
    };
  }, [measurementId]);

  return null;
}
