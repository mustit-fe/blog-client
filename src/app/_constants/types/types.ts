export type Division = 'frontend' | 'backend' | 'devops' | 'mobile';
export interface MDXMeta {
  title: string;
  description: string;
  date: string;
  division: Division;
  author: string;
  isPublished?: boolean;
  thumbnail?: string;
}

export interface MDX extends MDXMeta {
  body: string;
  slug: string;
}

export interface GetMDXsResponse {
  articles: MDX[] | [];
  hasNext: boolean;
  page: number;
  keyword?: string;
}

export interface Article {
  type: 'mdx' | 'article';
  id: number | string;
  author: User;
  content?: string; // 홈에서 리스트 불러올땐 불러오지 않음.
  createdAt: string;
  likes: number;
  isLiked: boolean;
  rawContent: string;
  published: boolean;
  thumbnail: string | null;
  title: string;
  updatedAt: string;
  views: number;
  preview: string;
}

export interface ArticleRow {
  id: number;
  authorId: User;
  content: string;
  createdAt: string;
  likes: number;
  rawContent: string;
  published: boolean;
  thumbnail: string | null;
  title: string;
  updatedAt: string;
  views: number;
}

export interface ArticlesResponse {
  articles: Article[];
  page: number;
  totalPage: number;
  keyword?: string;
}

export interface ArticlePost {
  title: string;
  content: string;
  rawContent: string;
  thumbnail?: string;
  published?: boolean;
}

export interface ArticlesGet {
  page: number;
  offset: number;
  keyword?: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
export interface SignupDto {
  email: string;
  password: string;
  division: Division;
}
export interface User {
  id: number | string;
  email: string;
  username: string;
  division: Division;
}
export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface LikeInfoDto {
  likes: number;
  isLiked: boolean;
}

export interface CommentDto {
  id: string;
  articleId: string;
  authorId: number;
  author: authorDto;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface authorDto {
  username: string;
  email: string;
  division: Division;
  createdAt: string;
  updatedAt: string;
}

export interface CommentList {
  comments: CommentDto[]; 
  userId: string; 
  setComments: Function; 
  setCommentCnt: Function;
}

