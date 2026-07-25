import 'server-only';

const siteUrl = process.env.SITE_URL;

if (!siteUrl) {
  throw new Error('Brak wymaganej zmiennej środowiskowej SITE_URL.');
}

export const SITE_URL = siteUrl.replace(/\/+$/, '');
