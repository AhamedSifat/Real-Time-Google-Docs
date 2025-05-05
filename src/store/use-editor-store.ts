import { create } from 'zustand';
import { type Editor } from '@tiptap/react';

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }), // Set the editor instance in the store
}));

export default useEditorStore;
