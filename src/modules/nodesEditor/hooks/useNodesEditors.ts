import { useState } from 'react';
import { EDITOR_GRID_BOARD_ID } from '@modules/nodesEditor/constants.ts';
import { IEditor } from '@modules/nodesEditor/types/IEditor.ts';
import { findEditorIndexById } from '@modules/nodesEditor/utils/findEditorIndexById.ts';

export const useNodesEditors = () => {
  const [editors, setEditors] = useState<IEditor[]>([]);

  const addEditor = (
    newEditor: Partial<Omit<IEditor, 'id' | 'name'>> &
      Pick<IEditor, 'id' | 'name'>,
  ) => {
    if (
      editors.some(
        editor => newEditor.id === editor.id || editor.name === editor.name,
      )
    ) {
      console.error(
        `Editor with name ${newEditor.name} or with id ${newEditor.id} already exists`,
      );
    } else {
      setEditors([
        ...editors,
        {
          ...newEditor,
          viewport: newEditor.viewport ?? {
            id: EDITOR_GRID_BOARD_ID(newEditor.id),
            coordinates: { x: 0, y: 0 },
          },
        },
      ]);
    }
  };

  const removeEditor = (id: IEditor['id']) => {
    const foundIndex = findEditorIndexById(id, editors, true);
    if (foundIndex !== -1) {
      setEditors(editors.filter((_, i) => i !== foundIndex));
    }
  };

  const updateEditor = (
    id: IEditor['id'],
    onUpdate: (editor: IEditor) => IEditor,
  ) => {
    const foundIndex = findEditorIndexById(id, editors, true);
    if (foundIndex !== -1) {
      setEditors(
        editors.map((editor, i) => {
          if (foundIndex === i) return onUpdate(editor);
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
