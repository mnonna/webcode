import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/oferta': {
      pl: '/oferta',
      en: '/offer',
    },
    '/oferta/[slug]': {
      pl: '/oferta/[slug]',
      en: '/offer/[slug]',
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/kontakt': {
      pl: '/kontakt',
      en: '/contact',
    },
    '/polityka-prywatnosci': {
      pl: '/polityka-prywatnosci',
      en: '/privacy-policy',
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
