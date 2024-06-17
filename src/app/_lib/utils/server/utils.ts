import matter from 'gray-matter';
import path from 'path';
import fs from 'fs/promises';
import { recursiveReadDir } from 'next/dist/lib/recursive-readdir';
import { Article, GetMDXsResponse, MDX, MDXMeta } from '@/app/_constants/types/types';

export interface GetMDXsProps {
  page: number;
  offset: number;
  keyword?: string;
}
export const getMDXs = async ({ page = 1, offset = 5, keyword }: GetMDXsProps): Promise<GetMDXsResponse> => {
  const mdxList = await allMDXs();
  const filteredMdxs = filterMDXs(mdxList);

  const sliced = filteredMdxs.slice((page - 1) * offset, page * offset);
  const hasNext = filteredMdxs.length > page * offset;

  return {
    articles: sliced,
    hasNext,
    page,
    ...(keyword && { keyword }),
  };
};

export const allMDXs = async (): Promise<MDX[]> => {
  const mdxFiles = await recursiveReadDir('./public/article');
  const mdxList = await Promise.all(
    mdxFiles
      .filter(file => path.extname(file) === '.mdx')
      .map(async file => {
        const postContent = await fs.readFile(file, 'utf8');
        const { data, content } = matter(postContent);

        const mdxMeta = data as MDXMeta;

        const segments = file.split('/');
        const slug = segments.at(-1)?.split('.')[0];

        return { ...mdxMeta, body: content, slug } as MDX;
      })
  );
  return mdxList;
};

export const filterMDXs = (mdxList: MDX[]): MDX[] => {
  const organized = mdxList
    .filter(mdx => mdx.description)
    .filter(mdx => mdx.isPublished === undefined || mdx.isPublished === true)
    .reduce((acc, mdx) => {
      if (acc.some(a => a.title === mdx.title)) return acc;
      return [...acc, mdx];
    }, [] as MDX[]);

  return organized;
};

export const getMDX = async (fileName: string): Promise<MDX> => {
  const mdxFiles = await recursiveReadDir('./public/article');

  const mdxFilePath = mdxFiles.find(file => path.extname(file) === '.mdx' && file.includes(fileName));

  if (!mdxFilePath) {
    throw new Error(`Mdx file '${fileName}' not found`);
  }

  const postContent = await fs.readFile(mdxFilePath, 'utf8');
  const { data, content } = matter(postContent);

  const mdxMeta = data as MDXMeta;

  const segments = mdxFilePath.split('/');
  const slug = segments.at(-1)?.split('.')[0];

  return { ...mdxMeta, body: content, slug } as MDX;
};

export function convertMDXToArticle(mdxs: GetMDXsResponse): Article[] {
  const converted: Article[] = mdxs.articles.map(mdx => ({
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
    isLiked: false,
    rawContent: mdx.body,
    published: mdx.isPublished ?? true,
    thumbnail: mdx.thumbnail ?? null,
    title: mdx.title,
    updatedAt: mdx.date,
    views: 0,
    preview: mdx.body.slice(0, 200),
  }));
  return converted;
}

// export function sortArticles(articles: Article[], mdxConverted: Article[]) {
//   const sorted = [...articles, ...mdxConverted].sort((a, b) => {
//     const aDate = new Date(a.createdAt);
//     const bDate = new Date(b.createdAt);
//     return aDate > bDate ? -1 : 1;
//   });
//   return sorted;
// }

export function sortArticles(articles: Article[]) {
  const sorted =articles.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate > bDate ? -1 : 1;
  });
  return sorted;
}
