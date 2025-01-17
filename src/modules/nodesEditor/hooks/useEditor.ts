import { useEffect, useState } from 'react';
import { DataRef, DragEndEvent } from '@dnd-kit/core';
import { NodesEditorInfoSchemaInfer } from '@modules/nodesEditor';
import { EDITOR_GRID_BOARD_ID } from '@modules/nodesEditor/constants.ts';
import { EditorMode } from '@modules/nodesEditor/types/EditorMode.ts';
import { IEditor } from '@modules/nodesEditor/types/IEditor.ts';
import { IEditorElementData } from '@modules/nodesEditor/types/IEditorElementData.ts';

export const useEditor = (name: NodesEditorInfoSchemaInfer['name']) => {
  const [editor, setEditor] = useState<IEditor>({
    id: 0,
    mode: 'dragging',
    name,
    content: [
      {
        id: 0,
        coordinates: { x: 0, y: 0 },
      },
    ],
    viewport: {
      id: EDITOR_GRID_BOARD_ID,
      coordinates: {
        x: 0,
        y: 0,
      },
    },
  });

  useEffect(() => {
    const onResize = () => {
      setEditor({
        ...editor,
        viewport: {
          ...editor.viewport,
          coordinates: { x: 0, y: 0 },
        },
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const setMode = (newMode: EditorMode) => {
    setEditor({
      ...editor,
      mode: newMode,
    });
  };

  const onDragEnd = (e: DragEndEvent) => {
    const data = e.active.data as DataRef<IEditorElementData>;
    switch (data.current?.type) {
      case 'viewport':
        return setEditor({
          ...editor,
          viewport: {
            ...editor.viewport,
            coordinates: {
              x: editor.viewport.coordinates.x + e.delta.x,
              y: editor.viewport.coordinates.y + e.delta.y,
            },
          },
        });
      case 'node':
        return setEditor({
          ...editor,
          content: editor.content.map(element => {
            if (element.id === e.active.id)
              return {
                ...element,
                coordinates: {
                  x: element.coordinates
                    ? element.coordinates.x + e.delta.x
                    : 0,
                  y: element.coordinates
                    ? element.coordinates.y + e.delta.y
                    : 0,
                },
              };
            return element;
          }),
        });
    }
  };

  return {
    onDragEnd,
    editor,
    setMode,
  };
};
