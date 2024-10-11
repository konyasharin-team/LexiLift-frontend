import { useContext, useRef } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { DragEndEvent } from '@dnd-kit/core';
import { useRounds } from '@hooks/useRounds.ts';
import { useTest } from '@hooks/useTest.ts';
import { MatchTestAnimationsContext } from '@modules/MatchTest/components/MatchTestAnimationsController/MatchTestAnimationsController.tsx';
import { MATCH_CARD_ANIMATIONS_DURATION_SECONDS } from '@modules/MatchTest/constants.ts';
import { checkAnswer } from '@utils/tests';

export const useMatchTest = (dictionary: IDictionaryItem[]) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { round, setRound, currentRoundDictionary } = useRounds(dictionary);
  const {
    items: cards,
    setItems: setCards,
    answers,
  } = useTest(currentRoundDictionary);
  const { animations, start, addAnimations } = useContext(
    MatchTestAnimationsContext,
  );

  const onDragEnd = (e: DragEndEvent) => {
    if (!addAnimations)
      return console.error('function "addAnimations" must be in context');
    const { over, active } = e;
    if (over && active.id !== over.id) {
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

  return {
    cards,
    setCards,
    boardRef,
    round,
    onDragEnd,
    animations,
    start,
  };
};
