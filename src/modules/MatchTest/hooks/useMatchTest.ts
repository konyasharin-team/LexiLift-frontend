import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { useBoard } from '@components/Board';
import { DragEndEvent } from '@dnd-kit/core';
import { useRounds } from '@hooks/useRounds.ts';
import { useTest } from '@hooks/useTest.ts';
import { useActions } from '@store/hooks';

import { checkAnswer } from '../../../app/utils/tests/checkAnswer.ts';

export const useMatchTest = (dictionary: IDictionaryItem[]) => {
  const { ref: boardRef, size: boardSize } = useBoard();
  const { round, setRound, currentRoundDictionary } = useRounds(dictionary);
  const {
    items: cards,
    setItems: setCards,
    answers,
  } = useTest(currentRoundDictionary);
  const {
    addMatchTestSuccess,
    addMatchTestError,
    removeMatchTestSuccess,
    removeMatchTestError,
  } = useActions();

  const onDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    if (over && active.id !== over.id) {
      const isSuccess = checkAnswer(answers, [over.id, active.id]);
      if (isSuccess) return addMatchTestSuccess([over.id, active.id]);
      return addMatchTestError([over.id, active.id]);
    }
  };

  return {
    cards,
    setCards,
    boardRef,
    round,
    onDragEnd,
  };
};
