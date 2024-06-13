import { Editor } from '@tiptap/react';

const Icon = {
  H1: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={editor.isActive('heading', { level: 1 }) ? 'text-blue-500' : ''}
    >
      H1
    </button>
  ),
  H2: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={editor.isActive('heading', { level: 2 }) ? 'text-blue-500' : ''}
    >
      H2
    </button>
  ),
  H3: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={editor.isActive('heading', { level: 3 }) ? 'text-blue-500' : ''}
    >
      H3
    </button>
  ),
  H4: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      className={editor.isActive('heading', { level: 4 }) ? 'text-blue-500' : ''}
    >
      H4
    </button>
  ),
  H5: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      className={editor.isActive('heading', { level: 5 }) ? 'text-blue-500' : ''}
    >
      H5
    </button>
  ),
  H6: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      className={editor.isActive('heading', { level: 6 }) ? 'text-blue-500' : ''}
    >
      H6
    </button>
  ),
  Bold: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={editor.isActive('bold') ? 'text-blue-500' : ''}
    >
      Bold
    </button>
  ),
  Italic: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={editor.isActive('italic') ? 'text-blue-500' : ''}
    >
      Italic
    </button>
  ),
  Strikethrough: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={editor.isActive('strike') ? 'text-blue-500' : ''}
    >
      Strikethrough
    </button>
  ),
  Code: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={editor.isActive('codeBlock') ? 'is-active' : ''}
    >
      code
    </button>
  ),
  Quote: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      className={editor.isActive('blockquote') ? 'text-blue-500' : ''}
    >
      Quote
    </button>
  ),
  AddPhoto: ({ editor }: { editor: Editor }) => {
    const uploadBucket = async (formData: FormData) => {
      const response = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const { fileUrl } = await response.json();
      editor.chain().focus().setImage({ src: fileUrl }).run();
    };
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);
      uploadBucket(formData);
    };
    return <input type="file" accept="image/*" onChange={handleFile} />;
  },
  BulletList: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
    >
      Bullet List
    </button>
  ),
  OrderedList: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={editor.isActive('orderedList') ? 'text-blue-500' : ''}
    >
      Ordered List
    </button>
  ),
  Line: ({ editor }: { editor: Editor }) => (
    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Line</button>
  ),
};

export default Icon;
