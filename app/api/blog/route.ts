import { getArticleBySlug, getArticles } from '@/src/data/blog/articles';

const DEFAULT_PER_PAGE = 10;
const MAX_PER_PAGE = 100;
function positiveInteger(value: string | null, fallback: number, maximum?: number) {
  const parsedValue = Number.parseInt(value ?? '', 10);

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return maximum ? Math.min(parsedValue, maximum) : parsedValue;
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const slug = searchParams.get('slug');
  const articlesWithSlugs = getArticles();

  if (slug) {
    const article = getArticleBySlug(slug);

    if (!article) {
      return Response.json(
        { error: 'Nie znaleziono artykułu.' },
        { status: 404 },
      );
    }

    return Response.json({ article });
  }

  const search = searchParams.get('search')?.trim().toLocaleLowerCase('pl-PL');
  const category = searchParams.get('category')?.trim().toLocaleLowerCase('pl-PL');
  const page = positiveInteger(searchParams.get('page'), 1);
  const perPage = positiveInteger(
    searchParams.get('perPage'),
    DEFAULT_PER_PAGE,
    MAX_PER_PAGE,
  );
  const filteredArticles = articlesWithSlugs.filter((article) => {
    const matchesCategory = !category
      || article.category?.toLocaleLowerCase('pl-PL') === category;
    const searchableContent = [
      article.title,
      article.excerpt,
      article.author.name,
      ...article.contentSections.map((section) => section.content),
    ]
      .join(' ')
      .toLocaleLowerCase('pl-PL');
    const matchesSearch = !search || searchableContent.includes(search);

    return matchesCategory && matchesSearch;
  });
  const startIndex = (page - 1) * perPage;
  const total = filteredArticles.length;

  return Response.json({
    articles: filteredArticles.slice(startIndex, startIndex + perPage),
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  });
}
