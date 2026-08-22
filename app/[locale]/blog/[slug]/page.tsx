import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ArticleTop from "@/src/components/blog/ArticleTop";
import ArticleTableOfContents from "@/src/components/blog/ArticleTableOfContents";
import ArticleAuthor from "@/src/components/blog/ArticleAuthor";
import HomeContact from '@/src/components/home/HomeContact';
import { SITE_URL } from "@/src/config/site";
import { getArticleBySlug, getArticles } from "@/src/data/blog/articles";
import { notFound, redirect } from "next/navigation";
import { getCmsArticleBySlug } from '@/src/lib/strapi';
import type { Metadata } from 'next';
import {setRequestLocale} from 'next-intl/server';
import type {AppLocale} from '@/src/i18n/routing';
import {getAvailableAlternates, getLocalizedPath, getLocalizedUrl, OPEN_GRAPH_LOCALE} from '@/src/i18n/seo';

interface BlogPostPageProps {
    params: Promise<{ locale: AppLocale; slug: string }>;
}

export function generateStaticParams() {
    return getArticles().map(({ slug }) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const article = await getCmsArticleBySlug(slug, locale) ?? (locale === 'pl' ? getArticleBySlug(slug) : null);
    if (!article) return {};

    const localizedPaths = Object.fromEntries(
        (article.localizations ?? [{locale, slug}]).map((item) => [item.locale, `/blog/${item.slug}`]),
    ) as Partial<Record<AppLocale, string>>;
    const canonical = getLocalizedUrl(locale, localizedPaths[locale] ?? `/blog/${slug}`);
    return {
        title: article.seo?.metaTitle ?? `${article.title} | Webcode`,
        description: article.seo?.metaDescription ?? article.excerpt,
        alternates: getAvailableAlternates(locale, localizedPaths),
        robots: article.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: {
            title: article.seo?.metaTitle ?? article.title,
            description: article.seo?.metaDescription ?? article.excerpt,
            url: canonical,
            type: 'article',
            locale: OPEN_GRAPH_LOCALE[locale],
            images: article.seo?.shareImage ?? article.image,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const article = await getCmsArticleBySlug(slug, locale) ?? (locale === 'pl' ? getArticleBySlug(slug) : null);

    if (!article) {
        notFound();
    }
    if (article.slug !== slug) redirect(getLocalizedPath(locale, `/blog/${article.slug}`));

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        ...(article.image && { image: new URL(article.image, SITE_URL).toString() }),
        datePublished: article.date,
        dateModified: article.dateModified,
        inLanguage: locale === 'pl' ? 'pl-PL' : 'en-GB',
        mainEntityOfPage: getLocalizedUrl(locale, `/blog/${slug}`),
        author: {
            "@type": "Person",
            name: article.author.name,
        },
        publisher: {
            "@type": "Organization",
            name: "Webcode",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo-icon.png`,
            },
        },
    };

    const tableOfContents = article.contentSections.flatMap((section) => {
        const heading = section.content.match(/<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/i);

        if (!heading) {
            return [];
        }

        return [{
            id: section.id,
            title: heading[1].replace(/<[^>]+>/g, '').trim(),
        }];
    });

    return (
        <div
            className="min-h-screen"
        >
            <Header localeLinks={Object.fromEntries(
                (article.localizations ?? [{locale, slug}]).map((item) => [item.locale, `/blog/${item.slug}`]),
            )} />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c'),
                    }}
                />
                <article className="py-section-y">
                    <div className="section-shell mx-auto 2xl:max-w-[70%]">
                        <div className="grid gap-10 xl:grid-cols-[minmax(180px,0.35fr)_minmax(0,1fr)] xl:gap-16">
                            <ArticleTableOfContents items={tableOfContents} hint={article.hint} />

                            <div className="min-w-0 w-full">
                                <section className="py-0 mb-8 xl:mb-12">
                                    <ArticleTop
                                        category={article.category}
                                        title={article.title}
                                        excerpt={article.excerpt}
                                        date={article.date}
                                        author={article.author.name}
                                        readTime={article.readTime}
                                        image={article.image}
                                        imageAlt={article.imageAlt}
                                    />
                                </section>
                                <div className="wysiwyg">
                                    {article.contentSections.map((section) => (
                                        <section
                                            key={section.id}
                                            id={section.id}
                                            className="scroll-mt-28"
                                            dangerouslySetInnerHTML={{ __html: section.content }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <ArticleAuthor {...article.author} />
                <HomeContact />
            </main>
            <Footer />
        </div>
    );
}
