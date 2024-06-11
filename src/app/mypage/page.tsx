import { cookies } from 'next/headers';
import API from '../_lib/fetcher/fetcher';
import ArticleItem from '../_components/home/Article';
import { Article } from '../_constants/types/types';

export default async function MyPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('mustit_blog_access_token');

  const response = await API.myArticles(token?.value ?? '');
  if (response.status !== 200) return <div>에러가 발생했습니다.</div>;

  const articles: Article[] = response.data.map(article => ({
    ...article,
    type: 'article',
  }));

  return (
    <main className="p-4">
      <h1 className="text-lg text-mustitBlack">내가 쓴글</h1>
      <ul>
        {articles.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </ul>
    </main>
  );
}
