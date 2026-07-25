'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import ArticleCard from '@/src/components/blog/ArticleCard';
import FeaturedArticle from '@/src/components/blog/FeaturedArticle';
import { getArticleCategory } from '@/src/helpers/blog-listing-utils';
import { useGsapReveal } from '@/src/hooks/useGsapReveal';
import type { BlogListItem } from '@/src/interface/Article';

const ALL_ARTICLES = 'Wszystkie';

interface BlogListingProps {
  articles: BlogListItem[];
}

export default function BlogListing({ articles }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_ARTICLES);
  const heroRef = useGsapReveal<HTMLElement>({
    selector: '[data-blog-hero-reveal]',
    start: 'top 88%',
    duration: 0.8,
  });
  const articlesRef = useGsapReveal<HTMLElement>({
    selector: '[data-blog-articles-reveal]',
    start: 'top 82%',
  });
  const gridRef = useGsapReveal<HTMLDivElement>({
    selector: '[data-blog-card]',
    start: 'top 88%',
    duration: 0.6,
    ease: 'power2.out',
    dependencyKey: activeCategory,
  });
  const ctaRef = useGsapReveal<HTMLElement>({
    selector: '[data-blog-cta-reveal]',
    start: 'top 88%',
  });
  const categories = useMemo(
    () => [
      ALL_ARTICLES,
      ...Array.from(new Set(articles.map(getArticleCategory))).sort((a, b) =>
        a.localeCompare(b, 'pl-PL'),
      ),
    ],
    [articles],
  );
  const filteredArticles = useMemo(
    () =>
      activeCategory === ALL_ARTICLES
        ? articles
        : articles.filter(
            (article) => getArticleCategory(article) === activeCategory,
          ),
    [activeCategory, articles],
  );

  const featuredArticle = articles[0];

  return (
    <>
      <section ref={heroRef} className="section relative overflow-hidden">
        <div className="section-shell relative">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p data-blog-hero-reveal="" className="wc-eyebrow mb-4">
                Blog
              </p>
              <h1
                data-blog-hero-reveal=""
                className="max-w-[13ch] font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold text-dark"
              >
                Praktyczna wiedza.{' '}
                <span className="relative inline-block">
                  <span className="wc-text-highlight">Realne efekty.</span>
                  <span
                    className="absolute -bottom-2 left-[4%] h-1 w-[92%] -rotate-2 rounded-full bg-blue"
                    aria-hidden="true"
                  />
                </span>
              </h1>
            </div>
            <div
              data-blog-hero-reveal=""
              className="relative max-w-xl pb-2 lg:justify-self-end"
            >
              <p className="wc-body-lg text-muted-foreground">
                Dzielę się doświadczeniem z zakresu tworzenia stron
                internetowych, SEO i technologii. Bez lania wody — konkretnie
                i na temat.
              </p>
              <ArrowUpRight
                className="mt-6 ml-auto hidden text-blue sm:block"
                size={44}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </div>

          {featuredArticle && (
            <div className='xl:max-w-[1000px] mx-auto'>
              <div
                data-blog-hero-reveal=""
                className="mt-12 sm:mt-16 lg:mt-20"
              >
                <FeaturedArticle article={featuredArticle} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        ref={articlesRef}
        className="pb-16 sm:pb-20 lg:pb-24"
        aria-labelledby="articles-title"
      >
        <div className="section-shell">
          <div
            data-blog-articles-reveal=""
            className="mb-8 flex items-end justify-between gap-6"
          >
            <div>
              <p className="wc-eyebrow">
                Baza wiedzy
              </p>
              <h2
                id="articles-title"
                className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-[-0.03em] text-dark sm:text-3xl"
              >
                Najnowsze artykuły
              </h2>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {filteredArticles.length}{' '}
              {filteredArticles.length === 1 ? 'artykuł' : 'artykułów'}
            </p>
          </div>

          <div
            data-blog-articles-reveal=""
            className="-mx-5 mb-9 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            role="group"
            aria-label="Filtruj artykuły według kategorii"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`wc-body-sm min-h-11 shrink-0 rounded-sm border px-5 py-2.5 font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'border-dark bg-dark !text-white'
                      : 'border-border bg-card text-muted-foreground hover:border-blue/40 hover:!text-blue'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div
            ref={gridRef}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            aria-live="polite"
          >
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <aside
        ref={ctaRef}
        className="section-shell mb-16 sm:mb-20 lg:mb-24"
        aria-label="Kontakt"
      >
        <div
          data-blog-cta-reveal=""
          className="flex flex-col gap-6 rounded-lg bg-dark p-6 text-white shadow-xl sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10"
        >
          <div className="flex items-start gap-4 sm:items-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue text-white sm:h-14 sm:w-14">
              <Mail size={24} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold sm:text-2xl">
                Masz temat, który warto omówić?
              </h2>
              <p className="mt-1 text-sm leading-6 text-white/70">
                Porozmawiajmy o Twojej stronie lub pomyśle na rozwój.
              </p>
            </div>
          </div>
          <Link
            href="/kontakt"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-blue px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Skontaktuj się
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </>
  );
}
