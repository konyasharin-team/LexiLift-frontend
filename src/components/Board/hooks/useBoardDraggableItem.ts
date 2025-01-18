import { ICoordinates } from '@app-types';
import { IBoardItem } from '@components/Board';
import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { Property } from 'csstype';

interface IUseBoardDraggableItemParams
  extends Omit<UseDraggableArguments, 'id' | 'attributes'> {
  item: IBoardItem;
  offset?: ICoordinates;
}

export const useBoardDraggableItem = ({
  item,
  disabled = false,
  data,
  offset,
}: IUseBoardDraggableItemParams) => {
  const { attributes, setNodeRef, transform, listeners, ...othersAttributes } =
    useDraggable({
      id: item.id,
      disabled,
      data,
    });

  console.log(
    item.coordinates ? item.coordinates.y - (offset?.y ?? 0) : undefined,
  );
  return {
    attributes: {
      ...attributes,
      ...listeners,
      style: {
        position: item.coordinates
          ? 'absolute'
          : ('relative' as Property.Position),
        top: item.coordinates
          ? `${item.coordinates.y - (offset?.y ?? 0)}px`
          : 'none',
        left: item.coordinates
          ? `${item.coordinates.x - (offset?.x ?? 0)}px`
          : 'none',
        ...(transform
          ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
            }
          : {
              transform: `translate(0px, 0px)`,
            }),
      },
    },
    ref: setNodeRef,
    ...othersAttributes,
  };
};
