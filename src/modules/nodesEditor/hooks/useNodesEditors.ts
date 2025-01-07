import { useState } from 'react';
import { NodesEditorSchemaInfer } from '@modules/nodesEditor';
import { findEditorById } from '@modules/nodesEditor/utils/findEditorById.ts';

export const useNodesEditors = () => {
  const [editors, setEditors] = useState<NodesEditorSchemaInfer[]>([]);

  const addEditor = (newEditor: NodesEditorSchemaInfer) => {
    if (
      editors.some(
        editor => newEditor.id === editor.id || editor.name === editor.name,
      )
    ) {
      console.error(
        `Editor with name ${newEditor.name} or with id ${newEditor.id} already exists`,
      );
    } else {
      setEditors([...editors, newEditor]);
    }
  };

  const removeEditor = (id: NodesEditorSchemaInfer['id']) => {
    const foundIndex = findEditorById(id, editors);
    if (foundIndex !== -1) {
      setEditors(editors.filter((_, i) => i !== foundIndex));
    }
  };

  const updateEditor = (
    id: NodesEditorSchemaInfer['id'],
    newData: Partial<Omit<NodesEditorSchemaInfer, 'id'>>,
  ) => {
    const foundIndex = findEditorById(id, editors);
    if (foundIndex !== -1) {
      setEditors(
        editors.map((editor, i) => {
          if (foundIndex === i) return { ...editor, ...newData };
          return editor;
        }),
      );
    }
  };

  return {
    addEditor,
    removeEditor,
    updateEditor,
    editors,
  };
};
