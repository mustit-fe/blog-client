import API from '@/app/_lib/fetcher/fetcher';
import '@/app/_components/editor/editor.css';
import LikeButton from '@/app/_components/common/LikeButton';
import SnsShare from '@/app/_components/common/SnsShare';
import CommentBox from '@/app/_components/common/CommentBox';

interface Props {
  params: { id: string };
}
export default async function ArticleDetailPage({ params: { id } }: Props) {
  const article = await API.fetchArticle(id);
  return (
    <main className="p-4 mt-10 text-mustitBlack">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <div className="mt-10" dangerouslySetInnerHTML={{ __html: article.content ?? '' }}></div>
      <div className='mt-[25px] flex'>
        <LikeButton params={{
          articleId: id,
          likes: article.likes,
          isLiked: article.isLiked
        }} />
        <SnsShare params={{title: article.title}}/>
      </div>
      <CommentBox/>
    </main>
  );
}
