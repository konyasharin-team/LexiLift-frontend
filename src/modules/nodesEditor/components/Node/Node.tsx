import { forwardRef } from 'react';
import { IBoardItem, useBoardDraggableItem } from '@components/Board';
import { Paper } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { IEditorElementData } from '@modules/nodesEditor/types/IEditorElementData.ts';

export const Node = forwardRef<HTMLDivElement, IBoardItem>(
  (props, externalRef) => {
    const { ref, ...attributes } = useBoardDraggableItem({
      item: props,
      data: { type: 'node' } as IEditorElementData,
    });

    return (
      <Paper ref={mergeRefs(ref, externalRef)} {...attributes}>
        Node
      </Paper>
    );
  },
);
