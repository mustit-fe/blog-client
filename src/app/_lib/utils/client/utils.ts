import { MDX } from '../../../_constants/types/types';

export const organizeMDXs = (articles: MDX[]) => {
  return articles
    .filter(article => article.description)
    .filter(article => article.isPublished === undefined || article.isPublished === true)
    .reduce((acc, article) => {
      if (acc.some(a => a.title === article.title)) return acc;
      return [...acc, article];
    }, [] as MDX[]);
};

export const highlight = (text: string, keyword: string) => {
  const regex = new RegExp(keyword, 'gi');
  return text?.replace(regex, match => `<strong class="text-themeBlue-100">${match}</strong>`);
};

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

export function removeMarkdown(markdownText: string) {
  // Remove headers
  markdownText = markdownText.replace(/^#{1,6}\s+/gm, '');

  // Remove bold and italic
  markdownText = markdownText.replace(/(\*\*|__)(.*?)\1/g, '$2'); // Bold
  markdownText = markdownText.replace(/(\*|_)(.*?)\1/g, '$2'); // Italic

  // Remove strikethrough
  markdownText = markdownText.replace(/~~(.*?)~~/g, '$1');

  // Remove inline code
  markdownText = markdownText.replace(/`(.*?)`/g, '$1');

  // Remove code blocks
  markdownText = markdownText.replace(/```[\s\S]*?```/g, '');
  markdownText = markdownText.replace(/~~~/g, '');

  // Remove blockquotes
  markdownText = markdownText.replace(/^>\s+/gm, '');

  // Remove unordered lists
  markdownText = markdownText.replace(/^\s*[-+*]\s+/gm, '');

  // Remove ordered lists
  markdownText = markdownText.replace(/^\s*\d+\.\s+/gm, '');

  // Remove horizontal rules
  markdownText = markdownText.replace(/^\s*[-*_]{3,}\s*$/gm, '');

  // Remove links and images
  markdownText = markdownText.replace(/!\[.*?\]\(.*?\)/g, '');
  markdownText = markdownText.replace(/\[.*?\]\(.*?\)/g, '');

  // Remove HTML tags
  markdownText = markdownText.replace(/<\/?[^>]+(>|$)/g, '');

  return markdownText;
}
