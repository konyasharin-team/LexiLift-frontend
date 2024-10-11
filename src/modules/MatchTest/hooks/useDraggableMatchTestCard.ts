import { IBoardItem, useBoardDraggableItem } from '@components/Board';
import { useDroppable } from '@dnd-kit/core';
import { mergeRefs } from '@mantine/hooks';

export const useDraggableMatchTestCard = (boardItem: IBoardItem) => {
  const { ref: dragRef, ...attributes } = useBoardDraggableItem({
    id: boardItem.id,
    coordinates: boardItem.coordinates,
  });
  const { setNodeRef: dropRef } = useDroppable({
    id: boardItem.id,
  });

  return {
    ref: mergeRefs(dragRef, dropRef),
    ...attributes,
  };
};
