import type {MetadataRoute} from 'next';
import {getArticles} from '@/src/data/blog/articles';
import {offerPageSlugs} from '@/src/data/offer/catalog';
import {getCmsArticles, getCmsPagesForSitemap} from '@/src/lib/strapi';
import {getLocalizedUrl} from '@/src/i18n/seo';
import type {AppLocale} from '@/src/i18n/routing';

type LocalizedEntry = {
  documentId: string;
  locale: AppLocale;
  pathname: string;
  lastModified?: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
};

function pagePath(template: string, slug: string) {
  if (template === 'offer-index') return '/oferta';
  if (template === 'offer-detail') return `/oferta/${slug}`;
  if (template === 'blog-index') return '/blog';
  if (['kontakt', 'contact'].includes(slug)) return '/kontakt';
  if (['polityka-prywatnosci', 'privacy-policy'].includes(slug)) return '/polityka-prywatnosci';
  if (slug === 'home') return '/';
  return null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [plPages, enPages, plArticles, enArticles] = await Promise.all([
    getCmsPagesForSitemap('pl'),
    getCmsPagesForSitemap('en'),
    getCmsArticles('pl'),
    getCmsArticles('en'),
  ]);

  const fallbackEntries: LocalizedEntry[] = [
    {documentId: 'fallback:home', locale: 'pl', pathname: '/', changeFrequency: 'monthly', priority: 1},
    {documentId: 'fallback:offer', locale: 'pl', pathname: '/oferta', changeFrequency: 'monthly', priority: 0.9},
    {documentId: 'fallback:blog', locale: 'pl', pathname: '/blog', changeFrequency: 'weekly', priority: 0.8},
    {documentId: 'fallback:contact', locale: 'pl', pathname: '/kontakt', changeFrequency: 'monthly', priority: 0.7},
    {documentId: 'fallback:privacy', locale: 'pl', pathname: '/polityka-prywatnosci', changeFrequency: 'monthly', priority: 0.3},
    ...offerPageSlugs.map((slug) => ({
      documentId: `fallback:offer:${slug}`,
      locale: 'pl' as const,
      pathname: `/oferta/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getArticles().map((article) => ({
      documentId: `fallback:article:${article.slug}`,
      locale: 'pl' as const,
      pathname: `/blog/${article.slug}`,
      lastModified: article.dateModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const cmsPages = [...plPages, ...enPages];
  const cmsArticles = [...plArticles, ...enArticles];
  const cmsEntries: LocalizedEntry[] = cmsPages.flatMap((page) => {
    const pathname = pagePath(page.template, page.slug);
    return pathname && !page.noIndex ? [{
      documentId: `page:${page.documentId}`,
      locale: page.locale,
      pathname,
      lastModified: page.updatedAt,
      changeFrequency: page.template === 'blog-index' ? 'weekly' as const : 'monthly' as const,
      priority: page.template === 'offer-index' ? 0.9 : page.template === 'offer-detail' ? 0.8 : 0.7,
    }] : [];
  });

  for (const article of cmsArticles) {
    if (article.seo?.noIndex) continue;
    cmsEntries.push({
      documentId: `article:${article.documentId ?? `${article.locale}:${article.slug}`}`,
      locale: article.locale ?? 'pl',
      pathname: `/blog/${article.slug}`,
      lastModified: article.dateModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  const excludedUrls = new Set<string>();
  for (const page of cmsPages) {
    const pathname = pagePath(page.template, page.slug);
    if (pathname && page.noIndex) excludedUrls.add(getLocalizedUrl(page.locale, pathname));
  }
  for (const article of cmsArticles) {
    if (article.seo?.noIndex) {
      excludedUrls.add(getLocalizedUrl(article.locale ?? 'pl', `/blog/${article.slug}`));
    }
  }

  const entriesByUrl = new Map<string, LocalizedEntry>();
  for (const entry of [...fallbackEntries, ...cmsEntries]) {
    const url = getLocalizedUrl(entry.locale, entry.pathname);
    if (!excludedUrls.has(url)) entriesByUrl.set(url, entry);
  }
  const entries = [...entriesByUrl.values()];

  const siblingsByDocumentId = new Map<string, LocalizedEntry[]>();
  for (const entry of entries) {
    const siblings = siblingsByDocumentId.get(entry.documentId) ?? [];
    siblings.push(entry);
    siblingsByDocumentId.set(entry.documentId, siblings);
  }

  return entries.map((entry) => {
    const siblings = siblingsByDocumentId.get(entry.documentId) ?? [entry];
    const languages: Record<string, string> = Object.fromEntries(
      siblings.map((candidate) => [candidate.locale, getLocalizedUrl(candidate.locale, candidate.pathname)]),
    );
    const polish = siblings.find((candidate) => candidate.locale === 'pl');
    if (polish) languages['x-default'] = getLocalizedUrl('pl', polish.pathname);

    return {
      url: getLocalizedUrl(entry.locale, entry.pathname),
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {languages},
    };
  });
}
