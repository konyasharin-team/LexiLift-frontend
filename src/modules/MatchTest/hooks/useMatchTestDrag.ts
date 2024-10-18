import { useEffect, useState } from 'react';
import { ITestItem } from '@app-types/ITestItem.ts';
import { Answer } from '@components/Board/types/Answer.ts';
import { DragEndEvent } from '@dnd-kit/core';
import { MATCH_CARD_ANIMATIONS_DURATION_SECONDS } from '@modules/MatchTest/constants.ts';
import { IDraggableMatchTestCard } from '@modules/MatchTest/types/IDraggableMatchTestCard.ts';
import { IMatchTestAnimation } from '@modules/MatchTest/types/IMatchTestAnimation.ts';
import { IMatchTestCardDraggableData } from '@modules/MatchTest/types/IMatchTestCardDraggableData.ts';
import { IMatchTestCardDroppableData } from '@modules/MatchTest/types/IMatchTestCardDroppableData.ts';
import { checkAnswer } from '@utils/tests';

export const useMatchTestDrag = (items: ITestItem[]) => {
  const [draggableItems, setDraggableItems] =
    useState<IDraggableMatchTestCard[]>(items);

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
        // console.log(
        //   active.rect.current.initial,
        //   active.rect.current.translated,
        // );
        console.log(
          active.rect.current.translated,
          over.rect
        )
        // if (active.rect.current.translated) {
        //   console.log(active.rect.current.translated.left - over.rect.left)
        //   console.log(active.rect.current.translated.top - over.rect.top)
        // }
        setDraggableItems(
          draggableItems.map(item => {
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

  useEffect(() => {
    setDraggableItems(prevState => {
      return items.map(item => {
        const foundPrevStateItem = prevState.find(
          prevStateItem => prevStateItem.id === item.id,
        );
        if (foundPrevStateItem)
          return {
            ...item,
            coordinates: foundPrevStateItem.coordinates,
          };
        return item;
      });
    });
  }, [items]);

  return {
    onDragEnd,
    draggableItems,
  };
};
