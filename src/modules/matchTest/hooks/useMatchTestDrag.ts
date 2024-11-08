import { Answer } from '@components/Board/types/Answer.ts';
import { DragEndEvent } from '@dnd-kit/core';
import { MATCH_CARD_ANIMATIONS_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';
import { IMatchTestCardDraggableData } from '@modules/matchTest/types/IMatchTestCardDraggableData.ts';
import { IMatchTestCardDroppableData } from '@modules/matchTest/types/IMatchTestCardDroppableData.ts';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { checkAnswer } from '@utils';

export const useMatchTestDrag = (
  items: IUseMatchTestReturn['items'],
  setItems: IUseMatchTestReturn['setItems'],
) => {
  const onDragEnd = (
    e: DragEndEvent,
    answers: Answer[],
    addAnimations: (animations: IMatchTestAnimation[]) => void,
  ) => {
    const { over, active } = e;

    const activeData = active?.data.current as
      | IMatchTestCardDraggableData
      | undefined;

    const overData = over?.data.current as
      | IMatchTestCardDroppableData
      | undefined;

    if (
      over &&
      active.id !== over.id &&
      activeData &&
      overData &&
      overData.accepts.includes(activeData.type)
    ) {
      const isSuccess = checkAnswer(answers, [over.id, active.id]);
      addAnimations([
        {
          itemId: active.id,
          type: isSuccess ? 'success' : 'error',
          timeLeft: MATCH_CARD_ANIMATIONS_DURATION_SECONDS,
        },
        {
          itemId: over.id,
          type: isSuccess ? 'success' : 'error',
          timeLeft: MATCH_CARD_ANIMATIONS_DURATION_SECONDS,
        },
      ]);
      if (isSuccess) {
        setItems(
          items.map(item => {
            if (item.id === active.id) {
              return {
                ...item,
                coordinates: active.rect.current.translated
                  ? {
                      x: active.rect.current.translated.left,
                      y: active.rect.current.translated.top,
                    }
                  : undefined,
              };
            }
            return item;
          }),
        );
      }
    }
  };

  return {
    onDragEnd,
  };
};
