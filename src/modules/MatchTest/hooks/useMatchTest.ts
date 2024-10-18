import { useRef } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { IBoardItem } from '@components/Board';
import { DragEndEvent } from '@dnd-kit/core';
import { useRounds } from '@hooks/useRounds.ts';
import { useTest } from '@hooks/useTest.ts';
import { useTimer } from '@hooks/useTimer/useTimer.ts';
import { useMatchTestAnimations } from '@modules/MatchTest/hooks/useMatchTestAnimations.ts';
import { useMatchTestDrag } from '@modules/MatchTest/hooks/useMatchTestDrag.ts';
import { IUseMatchTestReturn } from '@modules/MatchTest/types/IUseMatchTestReturn.ts';

export const useMatchTest = (
  dictionary: IDictionaryItem[],
): IUseMatchTestReturn => {
  const { animations, addAnimations, start } = useMatchTestAnimations(id =>
    onSuccess(id),
  );
  const boardRef = useRef<HTMLDivElement>(null);
  const { round, setRound, currentRoundDictionary } = useRounds(dictionary);
  const {
    items: cards,
    setItems: setCards,
    answers,
  } = useTest(currentRoundDictionary);
  const { onDragEnd, draggableItems } = useMatchTestDrag(cards);
  const timer = useTimer();

  const onSuccess = (id: IBoardItem['id'][]) => {
    setCards([...cards.filter(card => !id.includes(card.id))]);
  };

  const onError = (id: IBoardItem['id'][]) => {};

  const onDragEndHandle = (e: DragEndEvent) =>
    onDragEnd(e, answers, addAnimations);

  return {
    cards,
    setCards,
    boardRef,
    round,
    onSuccess,
    onError,
    answers,
    addAnimations,
    animations,
    start,
    onDragEnd: onDragEndHandle,
    draggableItems,
    timer,
  };
};
