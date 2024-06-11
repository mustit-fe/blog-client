import { Editor, BubbleMenu } from '@tiptap/react';
import Icon from './Icon';

import './toolbar.css';

interface ToolBarProps {
  editor: Editor | null;
}
function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <>
      <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
        <Icon.Bold editor={editor} />
        <Icon.Italic editor={editor} />
      </BubbleMenu>
      <div className="fixed left-1/2 top-[60px] transform -translate-x-[50%] flex items-center justify-center gap-2 p-6 py-3 sm:gap-8 bg-slate-800 w-max m-auto rounded-full mt-6 z-30 opacity-100">
        <div className="flex items-center justify-center gap-2 text-slate-400 font-bold">
          <Icon.H2 editor={editor} />
          <Icon.H3 editor={editor} />
          <Icon.H4 editor={editor} />
          <Icon.H5 editor={editor} />
          <Icon.H6 editor={editor} />
        </div>
        <div className="flex items-center justify-center gap-2 text-slate-400 font-bold">
          <Icon.Bold editor={editor} />
          <Icon.Italic editor={editor} />
          <Icon.Code editor={editor} />
        </div>

        <div className="flex items-center justify-center gap-2 text-slate-400 font-bold">
          <Icon.Line editor={editor} />
          <Icon.Quote editor={editor} />
          <Icon.AddPhoto editor={editor} />
        </div>
      </div>
    </>
  );
}

export default ToolBar;
