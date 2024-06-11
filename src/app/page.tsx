import API from '@/app/_lib/fetcher/fetcher';
import CommonContainer from './_components/common/CommonContainer';
import ArticleList from './_components/home/ArticleList';
import { ARTICLE_LIST_OFFSET } from '@/app/_constants/constant/constant';

export default async function Home() {
  const response = await API.getArticles({
    page: 1,
    offset: ARTICLE_LIST_OFFSET,
  });
  return (
    <CommonContainer header footer>
      <ArticleList initial={response} />
    </CommonContainer>
  );
}
