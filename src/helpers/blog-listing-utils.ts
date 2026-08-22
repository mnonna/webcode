import type { BlogListItem } from '@/src/interface/Article';

export function getArticleCategory(article: BlogListItem, defaultCategory = 'Technologie') {
  return article.category ?? defaultCategory;
}

export function formatArticleDate(date: string, locale = 'pl') {
  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Warsaw',
  }).format(new Date(date));
}
