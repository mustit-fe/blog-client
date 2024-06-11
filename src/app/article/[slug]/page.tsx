import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import { allMDXs, getMDX } from '@/app/_lib/utils/server/utils';
import ExternalScripts from '@/app/_components/common/ExternalScripts';
import BackButton from '@/app/_components/common/BackButton';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const mdxs = await allMDXs();
  return mdxs.map(mdx => ({
    slug: mdx.slug,
  }));
}

interface Props {
  params: { slug: string };
}
export default async function MDXArticle({ params }: Props) {
  // TODO: 유효하지않은 url일 경우 redirect('/')
  const { slug } = params;
  const mdx = await getMDX(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{mdx.title}</h1>
        <div className="flex justify-end mb-4">
          <span className="text-gray-600">
            {dayjs(mdx.date).format('YYYY-MM-DD')} <b>{mdx.author}</b>
          </span>
        </div>
      </div>
      <ExternalScripts />
      <div className="px-2 prose">
        <ReactMarkdown>{mdx.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  //const id = params.id;
  const { slug } = params;
  // fetch data
  const mdx = await getMDX(slug);

  return {
    title: mdx.title,
    authors: mdx.author,
    openGraph: {
      type: 'article',
      title: mdx.title,
      images: [
        {
          url: 'https://image.fi.co.kr/imgdata/933/452352(0).jpg',
        },
      ],
    },
  };
}
