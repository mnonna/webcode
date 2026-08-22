import Image from 'next/image';
import {Link} from '@/src/i18n/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import type { BlogListItem } from '@/src/interface/Article';
import { formatArticleDate } from '@/src/helpers/blog-listing-utils';

interface FeaturedArticleProps {
  article: BlogListItem;
  featuredLabel?: string;
}

export default function FeaturedArticle({
  article,
  featuredLabel,
}: FeaturedArticleProps) {
  const locale = useLocale();
  const t = useTranslations('Blog');
  return (
    <article className="grid overflow-hidden rounded-lg border border-border bg-card shadow-xl lg:grid-cols-2">
      <Link
        href={`/blog/${article.slug}`}
        className="relative block min-h-64 overflow-hidden bg-blue-soft sm:min-h-80 lg:min-h-[410px]"
        aria-label={t('readFeatured', {title: article.title})}
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt ?? article.title}
            fill
            priority
            sizes="(max-width: 1023px) calc(100vw - 40px), 50vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center text-blue">
            <ArrowUpRight size={48} aria-hidden="true" />
          </div>
        )}
      </Link>

      <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
        <span className="mb-5 w-fit rounded-sm bg-blue-soft px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-blue">
          {featuredLabel ?? t('featured')}
        </span>
        <time className="text-sm text-muted-foreground" dateTime={article.date}>
          {formatArticleDate(article.date, locale)}
        </time>
        <h2 className="mt-3 wc-heading-lg">
          {article.title}
        </h2>
        <p className="mt-5 line-clamp-3 wc-body-md">
          {article.excerpt}
        </p>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-7 inline-flex w-fit items-center gap-3 font-semibold text-blue transition-[gap] hover:gap-4"
        >
          {t('read')}
          <ArrowRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
