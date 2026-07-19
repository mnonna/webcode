import articlesData from '@/src/data/blog/articles.json';
import type { I_Article, I_ArticleResponse } from '@/src/interface/Article';

const articles: I_Article[] = articlesData;

export function createArticleSlug(title: string) {
  return title
    .toLocaleLowerCase('pl-PL')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getArticles(): I_ArticleResponse[] {
  return articles.map((article) => ({
    slug: createArticleSlug(article.title),
    ...article,
  }));
}

export function getArticleBySlug(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}
