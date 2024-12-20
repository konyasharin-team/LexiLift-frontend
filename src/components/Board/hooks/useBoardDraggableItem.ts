import { IBoardItem } from '@components/Board/types/IBoardItem.ts';
import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { Property } from 'csstype';

interface IUseBoardDraggableItemParams
  extends Omit<UseDraggableArguments, 'id' | 'attributes'> {
  item: IBoardItem;
}

export const useBoardDraggableItem = ({
  item,
  disabled = false,
  data,
}: IUseBoardDraggableItemParams) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    disabled,
    data,
  });

  return {
    ...attributes,
    ...listeners,
    ref: setNodeRef,
    style: {
      position: item.coordinates
        ? 'absolute'
        : ('relative' as Property.Position),
      top: item.coordinates ? `${item.coordinates.y}px` : 'none',
      left: item.coordinates ? `${item.coordinates.x}px` : 'none',
      ...(transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : {
            transform: `translate(0px, 0px)`,
          }),
    },
  };
};
