import type { Metadata } from "next";
import "./globals.css";

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
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
