'use client';

import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';

import css from 'highlight.js/lib/languages/css';
import ts from 'highlight.js/lib/languages/typescript';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
// load all highlight.js languages
import { lowlight } from 'lowlight';

import ToolBar from './ToolBar';
import CodeBlockOption from './CodeBlockOption';

import './editor.css';
import { debounce } from '@/app/_lib/utils/client/utils';
import API from '@/app/_lib/fetcher/fetcher';
import { useRouter } from 'next/navigation';

lowlight.registerLanguage('css', css);
lowlight.registerLanguage('ts', ts);

export default () => {
  const router = useRouter();
  const CustomDocument = Document.extend({
    content: 'heading block*',
  });
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
      StarterKit.configure({
        document: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockOption);
        },
      }).configure({ lowlight }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?';
          }
          return 'Write something amazing…';
        },
      }),
    ],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const debounced = debounce(() => {
        localStorage.setItem('mustit-blog-draft', html);
      }, 3000);
      debounced();
    },
    onCreate: ({ editor }) => {
      const draft = localStorage.getItem('mustit-blog-draft');
      if (draft) {
        editor.commands.setContent(draft);
      }
    },
  });

  const handleSubmit = async () => {
    const json = editor?.getJSON();
    const filteredContent = json?.content?.filter(node => node.type !== 'heading');
    const rawContent = filteredContent
      ?.map(node => {
        if (node.type === 'paragraph') {
          return node?.content?.map(textNode => textNode.text).join('');
        }
        return '';
      })
      .join('\n');

    const h1 = editor?.getHTML().match(/<h1>(.*?)<\/h1>/)?.[0];
    const title = h1?.replace('<h1>', '').replace('</h1>', '');
    const content = editor?.getHTML().replace(/<h1[^>]*>.*?<\/h1>/i, '');
    const imageTag = editor?.getHTML().match(/<img src="(.*?)"/)?.[0];
    const thumbnail = imageTag?.replace('<img src="', '').replace('"', '');
    if (!title || !content) return alert('제목과 내용을 입력해주세요');

    const createdArticle = await API.createArticle({
      title,
      content,
      rawContent: rawContent!,
      ...(thumbnail && { thumbnail }),
    });
    if (createdArticle.status === 200) {
      alert('게시글이 성공적으로 등록되었습니다.');
      localStorage.removeItem('mustit-blog-draft');
      router.push('/');
    }
  };

  return (
    <>
      <ToolBar editor={editor!} />
      <EditorContent editor={editor}></EditorContent>
      <button
        className="fixed left-0 bottom-0 w-full h-14 bg-mustitBlack text-white font-bold text-lg"
        onClick={handleSubmit}
      >
        등록
      </button>
    </>
  );
};
