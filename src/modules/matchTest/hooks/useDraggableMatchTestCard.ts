import { IBoardItem, useBoardDraggableItem } from '@components/Board';
import { useDroppable } from '@dnd-kit/core';
import { mergeRefs } from '@mantine/hooks';
import { DraggableMatchTestCardType } from '@modules/matchTest/types/DraggableMatchTestCardType.ts';
import { IMatchTestCardDraggableData } from '@modules/matchTest/types/IMatchTestCardDraggableData.ts';
import { IMatchTestCardDroppableData } from '@modules/matchTest/types/IMatchTestCardDroppableData.ts';

export const useDraggableMatchTestCard = (
  boardItem: IBoardItem,
  disabled: boolean = false,
  type: DraggableMatchTestCardType,
) => {
  const { ref: dragRef, ...attributes } = useBoardDraggableItem({
    item: boardItem,
    disabled,
    data: { type } as IMatchTestCardDraggableData,
  });
  const { setNodeRef: dropRef } = useDroppable({
    id: boardItem.id,
    data: {
      accepts: type === 'word' ? ['translation'] : ['word'],
    } as IMatchTestCardDroppableData,
  });

  return {
    ref: mergeRefs(dragRef, dropRef),
    ...attributes,
  };
};
