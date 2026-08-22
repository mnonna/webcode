import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BlogBackgroundOrbs from '@/src/components/blog/BlogBackgroundOrbs';
import BlogListing from '@/src/components/blog/BlogListing';
import { SITE_URL } from '@/src/config/site';
import { getArticles } from '@/src/data/blog/articles';
import type { BlogListItem } from '@/src/interface/Article';
import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { getCmsArticles, getCmsPageBySlug } from '@/src/lib/strapi';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {AppLocale} from '@/src/i18n/routing';
import {getAvailableAlternates, getLocalizedUrl, OPEN_GRAPH_LOCALE} from '@/src/i18n/seo';

type BlogPageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
  const {locale} = await params;
  setRequestLocale(locale);
  const [page, t] = await Promise.all([
    getCmsPageBySlug('blog', locale),
    getTranslations({locale, namespace: 'Metadata'}),
  ]);
  const title = page?.seo?.metaTitle ?? t('blogTitle');
  const description = page?.seo?.metaDescription ?? t('blogDescription');
  const canonical = getLocalizedUrl(locale, '/blog');
  const localizedPaths = Object.fromEntries(
    (page?.localizations ?? [{locale, slug: 'blog'}]).map((item) => [item.locale, '/blog']),
  ) as Partial<Record<AppLocale, string>>;
  return {
    title,
    description,
    alternates: getAvailableAlternates(locale, localizedPaths),
    robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      locale: OPEN_GRAPH_LOCALE[locale],
      siteName: 'Webcode',
    },
  };
}

export default async function BlogPage({params}: BlogPageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const [page, cmsArticles] = await Promise.all([
    getCmsPageBySlug('blog', locale),
    getCmsArticles(locale),
  ]);
  const articles = cmsArticles.length ? cmsArticles : locale === 'pl' ? getArticles() : [];
  const blogUrl = getLocalizedUrl(locale, '/blog');
  const localeLinks = Object.fromEntries(
    (page?.localizations ?? [{locale: 'pl'}]).map((item) => [item.locale, '/blog']),
  );
  const listingArticles: BlogListItem[] = articles.map(
    ({ slug, title, excerpt, date, readTime, image, imageAlt, category }) => ({
      slug,
      title,
      excerpt,
      date,
      readTime,
      image,
      imageAlt,
      category,
    }),
  );
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${blogUrl}#webpage`,
        url: blogUrl,
        name: t('blogTitle'),
        description: t('blogDescription'),
        inLanguage: locale === 'pl' ? 'pl-PL' : 'en-GB',
        mainEntity: {
          '@id': `${blogUrl}#blog`,
        },
      },
      {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        url: blogUrl,
        name: t('blogTitle'),
        inLanguage: locale === 'pl' ? 'pl-PL' : 'en-GB',
        publisher: {
          '@type': 'Organization',
          name: 'Webcode',
          url: SITE_URL,
        },
        blogPost: articles.map((article) => ({
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.excerpt,
          url: getLocalizedUrl(locale, `/blog/${article.slug}`),
          datePublished: article.date,
          dateModified: article.dateModified,
          ...(article.image && {
            image: new URL(article.image, SITE_URL).toString(),
          }),
          ...(article.category && {
            articleSection: article.category,
          }),
          author: {
            '@type': 'Person',
            name: article.author.name,
          },
        })),
      },
    ],
  };

  return (
    <div className="relative isolate min-h-screen bg-background">
      <BlogBackgroundOrbs />
      <Header localeLinks={localeLinks} />
      <main className="relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {page?.blocks?.length ? (
          <CmsPageBlocks blocks={page.blocks} articles={listingArticles} />
        ) : (
          <BlogListing articles={listingArticles} />
        )}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
