import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookiebotScript from "../src/components/CookiebotScript";
import RecaptchaProvider from "../src/components/RecaptchaProvider";
import { localBusinessLd, organizationLd } from "../src/data/jsonLd";
import "./globals.scss";
import "../src/scss/landing-utils.scss";

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

export const metadata: Metadata = {
  title: "Webcode - Tworzę strony, które działają",
  description: "Projektujemy nowoczesne strony internetowe, sklepy online i aplikacje webowe. Szybkie realizacje, SEO, responsywność i profesjonalne wsparcie.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

  return (
    <html
      lang="pl"
      className={`${inter.variable} ${manrope.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          data-cookieconsent="ignore"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          data-cookieconsent="ignore"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <RecaptchaProvider siteKey={process.env.RECAPTCHA_SITE_KEY}>
          {children}
        </RecaptchaProvider>
        <CookiebotScript />
      </body>
      {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
    </html>
  );
}
