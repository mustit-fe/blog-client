import {
  Article,
  ArticlePost,
  ArticleRow,
  ArticlesGet,
  ArticlesResponse,
  Division,
  IResponse,
  User,
  LikeInfoDto
} from '@/app/_constants/types/types';

const fetchArticles = async ({ page, offset, keyword }: ArticlesGet): Promise<ArticlesResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article?page=${page}&offset=${offset}${keyword ? `&keyword=${keyword}` : ''}`
  );
  return response.json();
};

const fetchArticle = async (id: string): Promise<Article> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`);
  return response.json();
};

const login = async (username: string, password: string): Promise<IResponse<User>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

const logout = async (): Promise<IResponse<unknown>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response.json();
};

const signup = async (email: string, password: string, division: Division): Promise<IResponse<User>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, division }),
  });
  return response.json();
};

export const createArticle = async (article: ArticlePost): Promise<IResponse<ArticleRow>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
    credentials: 'include',
  });
  return response.json();
};

const getArticles = async ({ page, offset, keyword }: ArticlesGet): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SELF_URL}/api/articles?page=${page}&offset=${offset}${keyword ? `&keyword=${keyword}` : ''}`
  );
  return response.json();
};

const myArticles = async (token: string): Promise<IResponse<Article[]>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/me`, {
    credentials: 'include',
    headers: {
      Cookie: `mustit_blog_access_token=${token}`,
    },
  });
  return response.json();
};

const likeArticle = async (articleId: string, userId: string): Promise<IResponse<ArticleRow>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${articleId}/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
    credentials: 'include',
  });
  return response.json();
};

const unlikeArticle = async (articleId: string, userId: string): Promise<IResponse<ArticleRow>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${articleId}/unlike`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
    credentials: 'include',
  });
  return response.json();
};

const getArticleLikeInfo = async (articleId: string): Promise<LikeInfoDto> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${articleId}/likeinfo`,{credentials: 'include'});
  return response.json();
}

const getArticleComment = async (articleId: string): Promise<any> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${articleId}/comment`,{credentials: 'include'});
  return response.json();
}

const API = {
  fetchArticles,
  fetchArticle,
  login,
  logout,
  signup,
  createArticle,
  getArticles,
  likeArticle,
  unlikeArticle,
  myArticles,
  getArticleLikeInfo
};

export default API;