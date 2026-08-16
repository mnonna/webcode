import 'server-only';

import type { CmsPage } from '@/src/interface/CmsPage';
import type { I_ArticleResponse } from '@/src/interface/Article';
import type { CmsMedia } from '@/src/interface/CmsPage';
import { getStrapiMediaUrl } from '@/src/lib/strapi-media';

type StrapiSingleResponse<T> = {
  data: T | null;
  meta: Record<string, unknown>;
};

type StrapiCollectionResponse<T> = {
  data: T[];
  meta: Record<string, unknown>;
};

type CmsArticlePayload = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  articleTop?: {
    excerpt: string;
    publicationDate: string;
    modifiedDate: string;
    readTime: string;
    cover?: CmsMedia | null;
    coverAlternativeText: string;
    tocHint?: string | null;
  } | null;
  author?: {
    name: string;
    bio: string;
    avatar?: CmsMedia | null;
  } | null;
  category?: { name: string } | null;
  content?: Array<{
    id: number;
    __component: 'article.rich-text-section';
    anchor?: string | null;
    body: string;
  }> | null;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    canonicalPath?: string | null;
    noIndex: boolean;
    shareImage?: CmsMedia | null;
  } | null;
};

export const STRAPI_URL = (process.env.STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '');

function createStrapiHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: 'application/json' };
  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }
  return headers;
}

function createFetchOptions(tag: string): RequestInit & { next?: { revalidate: number; tags: string[] } } {
  const headers = createStrapiHeaders();
  return process.env.NODE_ENV === 'development'
    ? { headers, cache: 'no-store' }
    : { headers, next: { revalidate: 60, tags: [tag] } };
}

function slugifyHeading(value: string) {
  return value
    .replace(/<[^>]+>/g, '')
    .toLocaleLowerCase('pl-PL')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapCmsArticle(article: CmsArticlePayload): I_ArticleResponse | null {
  if (!article.articleTop || !article.author?.name) return null;

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.articleTop.excerpt,
    date: article.articleTop.publicationDate,
    dateModified: article.articleTop.modifiedDate,
    readTime: article.articleTop.readTime,
    image: getStrapiMediaUrl(article.articleTop.cover),
    imageAlt: article.articleTop.coverAlternativeText ?? article.articleTop.cover?.alternativeText ?? undefined,
    hint: article.articleTop.tocHint ?? '',
    category: article.category?.name,
    author: {
      name: article.author.name,
      bio: article.author.bio ?? '',
      avatar: getStrapiMediaUrl(article.author.avatar),
    },
    contentSections: (article.content ?? []).map((section, index) => {
      const heading = section.body.match(/<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/i);
      return {
        id: section.anchor || (heading ? slugifyHeading(heading[1]) : `section-${index + 1}`),
        content: section.body,
      };
    }),
    seo: article.seo ? {
      metaTitle: article.seo.metaTitle,
      metaDescription: article.seo.metaDescription,
      canonicalPath: article.seo.canonicalPath,
      noIndex: article.seo.noIndex,
      shareImage: article.seo.shareImage ? getStrapiMediaUrl(article.seo.shareImage) : undefined,
    } : null,
  };
}

export async function getCmsPageBySlug(slug: string): Promise<CmsPage | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/pages/by-slug/${encodeURIComponent(slug)}`,
      createFetchOptions(`strapi-page-${slug}`),
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

export async function getCmsArticles(): Promise<I_ArticleResponse[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles/feed`,
      createFetchOptions('strapi-articles'),
    );
    if (!response.ok) throw new Error(`Strapi returned ${response.status} for article feed`);

    const payload = (await response.json()) as StrapiCollectionResponse<CmsArticlePayload>;
    return payload.data
      .map(mapCmsArticle)
      .filter((article): article is I_ArticleResponse => article !== null);
  } catch (error) {
    console.error('[Strapi] Could not load article feed', error);
    return [];
  }
}

export async function getCmsArticleBySlug(slug: string): Promise<I_ArticleResponse | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles/by-slug/${encodeURIComponent(slug)}`,
      createFetchOptions(`strapi-article-${slug}`),
    );
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Strapi returned ${response.status} for article ${slug}`);

    const payload = (await response.json()) as StrapiSingleResponse<CmsArticlePayload>;
    return payload.data ? mapCmsArticle(payload.data) : null;
  } catch (error) {
    console.error(`[Strapi] Could not load article "${slug}"`, error);
    return null;
  }
}
