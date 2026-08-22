import type {Metadata} from 'next';
import {SITE_URL} from '@/src/config/site';
import type {AppLocale} from './routing';

function translateFirstSegment(pathname: string, locale: AppLocale) {
  if (locale === 'pl') return pathname;
  if (pathname === '/oferta' || pathname.startsWith('/oferta/')) {
    return pathname.replace(/^\/oferta/, '/offer');
  }
  if (pathname === '/kontakt') return '/contact';
  if (pathname === '/polityka-prywatnosci') return '/privacy-policy';
  return pathname;
}

export function getLocalizedPath(locale: AppLocale, pathname: string) {
  const normalized = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  const translated = translateFirstSegment(normalized, locale);
  const localized = locale === 'pl' ? translated : `/en${translated === '/' ? '' : translated}`;
  return localized === '/' ? '/' : `${localized}/`;
}

export function getLocalizedUrl(locale: AppLocale, pathname: string) {
  return `${SITE_URL}${getLocalizedPath(locale, pathname)}`;
}

export function getStaticAlternates(locale: AppLocale, pathname: string): NonNullable<Metadata['alternates']> {
  return {
    canonical: getLocalizedUrl(locale, pathname),
    languages: {
      pl: getLocalizedUrl('pl', pathname),
      en: getLocalizedUrl('en', pathname),
      'x-default': getLocalizedUrl('pl', pathname),
    },
  };
}

export function getAvailableAlternates(
  locale: AppLocale,
  pathnames: Partial<Record<AppLocale, string>>,
): NonNullable<Metadata['alternates']> {
  const currentPath = pathnames[locale] ?? '/';
  const languages = Object.fromEntries(
    Object.entries(pathnames).map(([itemLocale, pathname]) => [
      itemLocale,
      getLocalizedUrl(itemLocale as AppLocale, pathname),
    ]),
  );

  return {
    canonical: getLocalizedUrl(locale, currentPath),
    languages: {
      ...languages,
      ...(pathnames.pl ? {'x-default': getLocalizedUrl('pl', pathnames.pl)} : {}),
    },
  };
}

export const OPEN_GRAPH_LOCALE = {
  pl: 'pl_PL',
  en: 'en_GB',
} as const;
