import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import type { BlogListItem } from '@/src/interface/Article';
import {
  formatArticleDate,
  getArticleCategory,
} from '@/src/helpers/blog-listing-utils';

interface ArticleCardProps {
  article: BlogListItem;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article
      data-blog-card
      className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition-[box-shadow] duration-300 hover:shadow-xl"
    >
      <Link
        href={`/blog/${article.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-blue-soft"
        aria-label={`Przeczytaj: ${article.title}`}
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt ?? article.title}
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-blue">
            <ArrowUpRight size={36} aria-hidden="true" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="wc-eyebrow !mb-2">
          {getArticleCategory(article)}
        </p>
        <p className="wc-heading-md">
          <Link
            href={`/blog/${article.slug}`}
            className="transition-colors hover:text-blue"
          >
            {article.title}
          </Link>
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="my-5 h-px w-full bg-border" />

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
          <time
            className="wc-caption flex items-center gap-2"
            dateTime={article.date}
          >
            <CalendarDays size={16} className="text-blue" aria-hidden="true" />
            {formatArticleDate(article.date)}
          </time>
          <span className="wc-caption flex items-center gap-2">
            <Clock3 size={16} className="text-blue" aria-hidden="true" />
            {article.readTime} czytania
          </span>
        </div>
      </div>
    </article>
  );
}
