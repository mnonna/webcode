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

const fallbackMetadata: Metadata = {
  title: 'Blog - Webcode - Tworzę strony, które działają',
  description:
    'Praktyczna wiedza o tworzeniu stron internetowych, SEO, UX i technologii. Konkretne porady, które pomagają rozwijać skuteczny biznes online.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog Webcode - praktyczna wiedza, realne efekty',
    description:
      'Poradniki i analizy o stronach internetowych, SEO, UX i technologii.',
    type: 'website',
    url: `${SITE_URL}/blog`,
    locale: 'pl_PL',
    siteName: 'Webcode',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug('blog');
  if (!page?.seo) return fallbackMetadata;

  const canonical = page.seo.canonicalPath
    ? `${SITE_URL}${page.seo.canonicalPath}`
    : `${SITE_URL}/blog`;
  return {
    title: page.seo.metaTitle,
    description: page.seo.metaDescription,
    alternates: { canonical },
    robots: page.seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: page.seo.metaTitle,
      description: page.seo.metaDescription,
      type: 'website',
      url: canonical,
      locale: 'pl_PL',
      siteName: 'Webcode',
    },
  };
}

export default async function BlogPage() {
  const [page, cmsArticles] = await Promise.all([
    getCmsPageBySlug('blog'),
    getCmsArticles(),
  ]);
  const articles = cmsArticles.length ? cmsArticles : getArticles();
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
        '@id': `${SITE_URL}/blog#webpage`,
        url: `${SITE_URL}/blog`,
        name: 'Blog Webcode',
        description:
          'Praktyczna wiedza o tworzeniu stron internetowych, SEO, UX i technologii.',
        inLanguage: 'pl-PL',
        mainEntity: {
          '@id': `${SITE_URL}/blog#blog`,
        },
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: 'Blog Webcode',
        inLanguage: 'pl-PL',
        publisher: {
          '@type': 'Organization',
          name: 'Webcode',
          url: SITE_URL,
        },
        blogPost: articles.map((article) => ({
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.excerpt,
          url: `${SITE_URL}/blog/${article.slug}`,
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
      <Header />
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
