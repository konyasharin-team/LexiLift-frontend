import { IBoardItem, useBoardDraggableItem } from '@components/Board';
import { useDroppable } from '@dnd-kit/core';
import { mergeRefs } from '@mantine/hooks';
import { IMatchTestCardDraggableData } from '@modules/matchTest/types/IMatchTestCardDraggableData.ts';
import { IMatchTestCardDroppableData } from '@modules/matchTest/types/IMatchTestCardDroppableData.ts';
import { TestItemType } from '@app-types';

export const useDraggableMatchTestCard = (
  boardItem: IBoardItem,
  disabled: boolean = false,
  type: TestItemType,
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
