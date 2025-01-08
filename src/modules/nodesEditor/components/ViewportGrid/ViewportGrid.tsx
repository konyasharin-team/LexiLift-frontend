import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { IBoardItem, useBoardDraggableItem } from '@components/Board';
import { Box } from '@mantine/core';
import { mergeRefs } from '@mantine/hooks';
import { IEditor } from '@modules/nodesEditor/types/IEditor.ts';
import { IEditorElementData } from '@modules/nodesEditor/types/IEditorElementData.ts';

interface IViewportGridProps extends IBoardItem, Pick<IEditor, 'content'> {
  children?: ReactNode;
}

interface IViewportGridSize {
  height: string | number;
  width: string | number;
}

export const ViewportGrid = forwardRef<HTMLDivElement, IViewportGridProps>(
  (props, externalRef) => {
    const { ref, ...attributes } = useBoardDraggableItem({
      item: props,
      data: { type: 'viewport' } as IEditorElementData,
    });

    const calculateSize = () => {
      if (props.content.length > 0) {
        const values = props.content.reduce(
          (acc, value) => {
            const coordinates = value.coordinates ?? { x: 0, y: 0 };
            let newValues = { ...acc };
            if (coordinates.x > acc.maxX)
              newValues = { ...newValues, maxX: coordinates.x };
            if (coordinates.x < acc.minX)
              newValues = { ...newValues, minX: coordinates.x };
            if (coordinates.y < acc.maxY)
              newValues = { ...newValues, maxY: coordinates.y };
            if (coordinates.y < acc.minY)
              newValues = { ...newValues, minY: coordinates.y };
            return newValues;
          },
          {
            maxX: 0,
            minX: 0,
            maxY: 0,
            minY: 0,
          },
        );
        return {
          width: `calc(max(100%, ${values.maxX}px - ${values.minX}px))`,
          height: `calc(max(100%, ${values.maxY}px - ${values.minY}px))`,
        };
      }
      return {
        width: '100%',
        height: '100%',
      };
    };

    const [size, setSize] = useState<IViewportGridSize>(calculateSize());

    useEffect(() => {
      setSize(calculateSize());
    }, [props.content]);

    return (
      <Box
        ref={mergeRefs(externalRef, ref)}
        w={size.width}
        h={size.height}
        pos={'relative'}
        bg={'cyan'}
        {...attributes}
      >
        {props.children}
      </Box>
    );
  },
);
