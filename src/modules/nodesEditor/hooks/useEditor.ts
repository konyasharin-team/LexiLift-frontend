import { useContext, useEffect, useRef, useState } from 'react';
import { DataRef, DragEndEvent } from '@dnd-kit/core';
import {
  NodesEditorInfoSchemaInfer,
  NodesEditorsContext,
} from '@modules/nodesEditor';
import { EDITOR_GRID_BOARD_ID } from '@modules/nodesEditor/constants.ts';
import { IEditorElementData } from '@modules/nodesEditor/types/IEditorElementData.ts';
import { transformCoordinatesToGlobal } from '@modules/nodesEditor/utils/transformCoordinatesToGlobal.ts';

export const useEditor = (name: NodesEditorInfoSchemaInfer['name']) => {
  const context = useContext(NodesEditorsContext);
  const refs = useRef<{
    viewport: HTMLDivElement | null;
    board: HTMLDivElement | null;
    content: (HTMLDivElement | null)[];
  }>({ viewport: null, board: null, content: [] });
  const [currentEditorId, setCurrentEditorId] = useState<
    NodesEditorInfoSchemaInfer['id'] | null
  >(null);

  const update = () => {
    console.log(
      context,
      currentEditorId,
      refs.current.content,
      refs.current.content.length,
      refs.current.content[0],
      refs.current,
    );
    if (context && currentEditorId !== null)
      context?.updateEditor(currentEditorId, editor => ({
        ...editor,
        name,
        viewport: {
          id: EDITOR_GRID_BOARD_ID(0),
          coordinates: transformCoordinatesToGlobal(
            refs.current.board,
            refs.current.viewport,
            { x: 0, y: 0 },
          ),
        },
        content: [
          {
            id: 'test',
            coordinates: transformCoordinatesToGlobal(
              refs.current.board,
              refs.current.content[0],
              {
                x: 1000,
                y: 1000,
              },
            ),
          },
        ],
      }));
  };

  useEffect(() => {
    const onResize = () => {
      if (currentEditorId !== null)
        context?.updateEditor(currentEditorId, editor => ({
          ...editor,
          viewport: {
            ...editor.viewport,
            coordinates: transformCoordinatesToGlobal(
              refs.current.board,
              refs.current.viewport,
              { x: 0, y: 0 },
            ),
          },
        }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [currentEditorId]);

  useEffect(() => {
    if (context?.editors.length === 0) {
      context?.addEditor({
        id: 0,
        name,
      });
      setCurrentEditorId(0);
    }
  }, []);

  const onDragEnd = (e: DragEndEvent) => {
    if (!context || currentEditorId === null)
      return console.error('No editor id or context provided');
    const data = e.active.data as DataRef<IEditorElementData>;
    switch (data.current?.type) {
      case 'viewport':
        return context.updateEditor(currentEditorId, editor => ({
          ...editor,
          viewport: {
            ...editor.viewport,
            coordinates: {
              x: editor.viewport.coordinates.x + e.delta.x,
              y: editor.viewport.coordinates.y + e.delta.y,
            },
          },
        }));
      case 'node':
        return context.updateEditor(currentEditorId, editor => ({
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
        }));
    }
  };

  return {
    onDragEnd,
    currentEditorId,
    refs,
    update,
  };
};
