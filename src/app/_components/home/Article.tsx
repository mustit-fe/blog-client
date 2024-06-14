import { Article, DivisionEnum } from '@/app/_constants/types/types';
import { highlight, removeMarkdown } from '@/app/_lib/utils/client/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  article: Article;
  keyword?: string;
}
export default function ArticleItem({ article, keyword }: Props) {
  return (
    <Link
      href={article.type === 'article' ? `/article/detail/${article.id}` : `/article/${article.id}`}
      key={article.title}
      prefetch={false}
    >
      <li className="flex justify-between p-6 sm:p-8 w-full h-[200px] text-slate-700 gap-12 border border-themeBlue-100 rounded-2xl border-opacity-0 hover:border-opacity-100 transition duration-300 group">
        <div className="flex flex-col justify-between h-full">
          <h1 className="text-2xl sm:text-3xl font-bold group-hover:text-themeBlue-100 duration-300">
            <span
              className="line-clamp-1"
              dangerouslySetInnerHTML={{
                __html: highlight(article.title, keyword ?? ''),
              }}
            />
          </h1>
          <p>
            <span
              className="line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: highlight(removeMarkdown(article.preview), keyword ?? ''),
              }}
            />
          </p>
          <div className="flex space-x-2 text-sm text-slate-400">
            <span>{dayjs(article.createdAt).format('YYYY-MM-DD')}</span>
            <span>{DivisionEnum[article.author?.division]}</span>
            <span className="font-bold">{article.author?.username}</span>
          </div>
        </div>
        {article.thumbnail && (
          <div className="relative h-full aspect-square">
            <Image
              src={article.thumbnail}
              alt={article.title}
              priority
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </li>
    </Link>
  );
}
