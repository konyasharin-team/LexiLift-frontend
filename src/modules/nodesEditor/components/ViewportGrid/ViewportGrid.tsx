import { forwardRef, ReactNode } from 'react';
import { IBoardItem, useBoardDraggableItem } from '@components/Board';
import { Box } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';

interface IViewportGridProps extends IBoardItem {
  children?: ReactNode;
}

export const ViewportGrid = forwardRef<HTMLDivElement, IViewportGridProps>(
  (props, ref) => {
    const { ref: draggableRef, ...attributes } = useBoardDraggableItem({
      item: props,
    });
    return (
      <Box
        ref={mergeRefs(ref, draggableRef)}
        w={'80%'}
        h={'80%'}
        pos={'relative'}
        bg={'cyan'}
        {...attributes}
      >
        {props.children}
      </Box>
    );
  },
);
