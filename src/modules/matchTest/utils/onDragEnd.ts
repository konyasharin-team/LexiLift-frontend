import { Answer } from '@components/Board/types/Answer.ts';
import { Active, DragEndEvent, Over } from '@dnd-kit/core';
import { IMatchTestCardDraggableData } from '@modules/matchTest/types/IMatchTestCardDraggableData.ts';
import { IMatchTestCardDroppableData } from '@modules/matchTest/types/IMatchTestCardDroppableData.ts';
import { checkAnswer } from '@utils';

export const onDragEnd = (
  e: DragEndEvent,
  answers: Answer[],
  onSuccess: (active: Active, over: Over) => void,
  onError: (active: Active, over: Over) => void,
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
    if (isSuccess) onSuccess(active, over);
    else onError(active, over);
  }
};
