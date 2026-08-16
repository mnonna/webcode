import 'server-only';

import type { CmsPage } from '@/src/interface/CmsPage';

type StrapiSingleResponse<T> = {
  data: T | null;
  meta: Record<string, unknown>;
};

export const STRAPI_URL = (process.env.STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '');

export async function getCmsPageBySlug(slug: string): Promise<CmsPage | null> {
  const headers: HeadersInit = { Accept: 'application/json' };
  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(
      `${STRAPI_URL}/api/pages/by-slug/${encodeURIComponent(slug)}`,
      {
        headers,
        next: {
          revalidate: 60,
          tags: [`strapi-page-${slug}`],
        },
      },
    );

    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(`Strapi returned ${response.status} for page ${slug}`);
    }

    const payload = (await response.json()) as StrapiSingleResponse<CmsPage>;
    return payload.data;
  } catch (error) {
    console.error(`[Strapi] Could not load page "${slug}"`, error);
    return null;
  }
}
