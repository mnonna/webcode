import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import ConsentAwareGoogleAnalytics from "@/src/components/ConsentAwareGoogleAnalytics";
import RecaptchaProvider from "@/src/components/RecaptchaProvider";
import { getLocalBusinessLd, getOrganizationLd } from "@/src/data/jsonLd";
import {routing} from '@/src/i18n/routing';
import {SITE_URL} from '@/src/config/site';
import {OPEN_GRAPH_LOCALE} from '@/src/i18n/seo';
import "../globals.scss";
import "../../src/scss/landing-utils.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
  metadataBase: new URL(SITE_URL),
  title: t('homeTitle'),
  description: t('homeDescription'),
  openGraph: {
    title: t('homeTitle'),
    description: t('homeDescription'),
    url: SITE_URL,
    siteName: 'Webcode',
    type: 'website',
    locale: OPEN_GRAPH_LOCALE[locale],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;
  const organizationLd = getOrganizationLd(locale);
  const localBusinessLd = getLocalBusinessLd(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${manrope.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          id="kookiok-consent"
          src="https://cdn.kookiok.com/consent.js?id=019fd853-f692-74cd-8b9f-533060f58a5a"
          defer
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {googleAnalyticsId && (
          <ConsentAwareGoogleAnalytics measurementId={googleAnalyticsId} />
        )}

        <NextIntlClientProvider>
          <RecaptchaProvider siteKey={process.env.RECAPTCHA_SITE_KEY}>
            {children}
          </RecaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
