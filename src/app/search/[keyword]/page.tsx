import ArticleList from '@/app/_components/home/ArticleList';
import API from '@/app/_lib/fetcher/fetcher';

export default async function SearchResultPage({ params: { keyword } }: { params: { keyword: string } }) {
  const response = await API.fetchArticles({
    keyword,
    page: 1,
    offset: 5,
  });
  return <ArticleList initial={response} keyword={keyword} />;
}
