import { Answer } from '@components/Board/types/Answer.ts';
import { DragEndEvent } from '@dnd-kit/core';
import { MATCH_CARD_ANIMATIONS_DURATION_SECONDS } from '@modules/MatchTest/constants.ts';
import { IMatchTestAnimation } from '@modules/MatchTest/types/IMatchTestAnimation.ts';
import { IMatchTestCardDraggableData } from '@modules/MatchTest/types/IMatchTestCardDraggableData.ts';
import { IMatchTestCardDroppableData } from '@modules/MatchTest/types/IMatchTestCardDroppableData.ts';
import { checkAnswer } from '@utils/tests';

export const onDragEnd = (
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
  }
};
