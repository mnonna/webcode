import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ArticleTop from "@/src/components/blog/ArticleTop";
import ArticleTableOfContents from "@/src/components/blog/ArticleTableOfContents";
import ArticleAuthor from "@/src/components/blog/ArticleAuthor";
import HomeContact from '@/src/components/home/HomeContact';
import { getArticleBySlug, getArticles } from "@/src/data/blog/articles";
import { notFound } from "next/navigation";

const SITE_URL = "https://webcode.com.pl";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getArticles().map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        ...(article.image && { image: new URL(article.image, SITE_URL).toString() }),
        datePublished: article.date,
        dateModified: article.dateModified,
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
            <Header />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c'),
                    }}
                />
                <article className="section section--article">
                    <div className="section-shell mx-auto 2xl:max-w-[70%]">
                        <div className="grid gap-10 xl:grid-cols-[minmax(180px,0.35fr)_minmax(0,1fr)] xl:gap-16">
                            <ArticleTableOfContents items={tableOfContents} hint={article.hint} />

                            <div className="min-w-0 w-full">
                                <section className="mb-8 xl:mb-12">
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
