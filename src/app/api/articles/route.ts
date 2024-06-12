import API from '@/app/_lib/fetcher/fetcher';
import { getMDXs } from '@/app/_lib/utils/server/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) ?? 1;
  const offset = Number(searchParams.get('offset')) ?? 5;
  const keyword = searchParams.get('keyword') ?? '';

  const articles = await API.fetchArticles({ page, offset, keyword });
  articles.articles = articles.articles.map(article => ({
    ...article,
    type: 'article',
  }));
  const mdxs = await getMDXs({ page, offset, keyword });

  const mdxConverted: any[] = mdxs.articles.map(mdx => ({
    type: 'mdx',
    id: mdx.slug,
    author: {
      id: 9999999999,
      email: '',
      username: mdx.author,
      division: 'frontend',
    },
    createdAt: mdx.date,
    likes: 0,
    rawContent: mdx.body,
    published: mdx.isPublished ?? true,
    thumbnail: mdx.thumbnail ?? null,
    title: mdx.title,
    updatedAt: mdx.date,
    views: 0,
    preview: mdx.body.slice(0, 200),
  }));

  const sorted = [...articles.articles, ...mdxConverted].sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate > bDate ? -1 : 1;
  });

  return Response.json({
    articles: sorted,
    page: articles.page,
    totalPage: Math.max(articles.totalPage, mdxs.hasNext ? page + 1 : page),
    ...(keyword && { keyword }),
  });
}

export async function POST() {
  return new Response('POST method is not allowed.', {
    status: 405,
    statusText: 'Method Not Allowed',
  });
}
