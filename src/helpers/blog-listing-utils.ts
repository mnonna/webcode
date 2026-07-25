import type { BlogListItem } from '@/src/interface/Article';

const DEFAULT_CATEGORY = 'Technologie';

export function getArticleCategory(article: BlogListItem) {
  return article.category ?? DEFAULT_CATEGORY;
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Warsaw',
  }).format(new Date(date));
}
