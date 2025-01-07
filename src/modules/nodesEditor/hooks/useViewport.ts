import { useContext, useEffect, useState } from 'react';
import { DragMoveEvent } from '@dnd-kit/core';
import {
  NodesEditorInfoSchemaInfer,
  NodesEditorsContext,
} from '@modules/nodesEditor';
import { findEditorIndexById } from '@modules/nodesEditor/utils/findEditorIndexById.ts';

export const useViewport = (name: NodesEditorInfoSchemaInfer['name']) => {
  const context = useContext(NodesEditorsContext);
  const [currentEditorId, setCurrentEditorId] = useState<
    NodesEditorInfoSchemaInfer['id'] | null
  >(null);

  useEffect(() => {
    context?.addEditor({
      id: 0,
      name,
    });
    setCurrentEditorId(0);
    return () => {
      if (context && findEditorIndexById(0, context.editors) !== -1) {
        context.removeEditor(0);
      }
    };
  }, [name]);

  const onDragEnd = (e: DragMoveEvent) => {
    if (!context || currentEditorId === null)
      return console.error('No editor id or context provided');
    context.updateEditor(currentEditorId, editor => ({
      ...editor,
      viewport: {
        ...editor.viewport,
        coordinates: {
          x: editor.viewport.coordinates.x + e.delta.x,
          y: editor.viewport.coordinates.y + e.delta.y,
        },
      },
    }));
  };

  return {
    onDragEnd,
    currentEditorId,
  };
};
