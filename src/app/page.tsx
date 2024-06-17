import API from '@/app/_lib/fetcher/fetcher';
import CommonContainer from './_components/common/CommonContainer';
import ArticleList from './_components/home/ArticleList';
import { ARTICLE_LIST_OFFSET } from '@/app/_constants/constant/constant';
import { sortArticles } from './_lib/utils/server/utils';

export default async function Home() {
  const articles = await API.fetchArticles({ page: 1, offset: ARTICLE_LIST_OFFSET });
  articles.articles = articles.articles.map(article => ({
    ...article,
    type: 'article',
  }));
  // const mdxs = await getMDXs({ page: 1, offset: ARTICLE_LIST_OFFSET });
  // const mdxConverted = convertMDXToArticle(mdxs);
  const sorted = sortArticles(articles.articles);

  const response = {
    articles: sorted,
    page: articles.page,
    totalPage: Math.max(articles.totalPage),
  };
  return (
    <CommonContainer header footer>
      <ArticleList initial={response} />
    </CommonContainer>
  );
}
