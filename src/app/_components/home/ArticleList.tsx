'use client';

import API from '@/app/_lib/fetcher/fetcher';
import { useCallback, useState } from 'react';
import { ArticlesResponse } from '@/app/_constants/types/types';
import ArticleItem from './Article';
import ViewObserver from '../common/ViewObserver';
import { ARTICLE_LIST_OFFSET } from '@/app/_constants/constant/constant';
import LinkButton from '@/app/_components/common/LinkButton';

interface Props {
  initial: ArticlesResponse;
  keyword?: string;
}
export default function ArticleList({ initial, keyword }: Props) {
  const [data, setData] = useState<ArticlesResponse>(initial);

  const next = useCallback(() => {
    if (data.page < data.totalPage) {
      API.getArticles({
        page: data.page + 1,
        offset: ARTICLE_LIST_OFFSET,
        ...(keyword && { keyword }),
      }).then(response => {
        const newArticles = response.articles ?? [];
        if (newArticles.length > 0) {
          setData(prev => ({
            ...response,
            articles: [...prev.articles, ...newArticles],
          }));
        }
      });
    }
  }, [data, keyword]);

  return (
    <main>
      {data.keyword && (
        <section className="mt-12 mx-4 text-2xl text-themeNavy">
          <strong className="text-3xl text-themeBlue-500">&quot;{data.keyword}&quot;</strong>
          <span className="font-semibold"> 검색 결과</span>
        </section>
      )}
      <ul className="flex flex-col gap-2 mt-12 mx-4">
        {data.articles?.map(article => <ArticleItem article={article} key={article.title} keyword={data.keyword} />)}
        <ViewObserver onView={next} onHide={null} />
      </ul>
      {data.articles?.length <= 0 && (
        <section className="text-center">
          <p className="text-themeBlue-500">글이 없습니다.</p>
          <LinkButton href="/" classes="mt-8 px-4 text-themeBlue-100 text-xl">
            메인으로 돌아가기
          </LinkButton>
        </section>
      )}
    </main>
  );
}
