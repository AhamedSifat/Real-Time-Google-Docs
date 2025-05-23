'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import StarterKit from '@tiptap/starter-kit';
import useEditorStore from '@/store/use-editor-store';
import Ruler from './Ruler';
import { Threads } from './Threads';
import { useStorage } from '@liveblocks/react';

interface EditorProps {
  initialContent?: string | undefined;
}

const Editor = ({ initialContent }: EditorProps) => {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);
  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      setEditor(editor); // Set the editor instance in the store
    },

    onUpdate({ editor }) {
      // The content has changed.
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      // The selection has changed.
      setEditor(editor);
    },
    onTransaction({ editor }) {
      // The editor state has changed.
      setEditor(editor);
    },
    onFocus({ editor }) {
      // The editor is focused.
      setEditor(editor);
    },
    onBlur({ editor }) {
      // The editor isn’t focused anymore.
      setEditor(editor);
    },
    onDestroy() {
      // The editor is being destroyed.
      setEditor(null);
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      TaskList,
      liveblocks,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ImageResize,
      Image,
      FontFamily,
      TextStyle,
      Underline,
      FontSizeExtension,
      Color,
      LineHeightExtension.configure({
        types: ['paragraph', 'heading'],
        defaultLineHeight: 'normal',
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Highlight.configure({ multicolor: true }),
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? 55}px; padding-right: ${rightMargin ?? 55}px`,
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
  });

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0 '>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
