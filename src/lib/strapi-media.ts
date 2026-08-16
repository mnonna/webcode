import type { CmsMedia } from '@/src/interface/CmsPage';

const publicStrapiUrl = (
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  process.env.STRAPI_URL ??
  'http://localhost:1337'
).replace(/\/$/, '');

export function getStrapiMediaUrl(media?: CmsMedia | null) {
  if (!media?.url) return '';
  if (/^https?:\/\//i.test(media.url)) return media.url;
  return `${publicStrapiUrl}${media.url.startsWith('/') ? '' : '/'}${media.url}`;
}
