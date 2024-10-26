import { useEffect, useRef, useState } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { IBoardItem } from '@components/Board';
import { DragEndEvent } from '@dnd-kit/core';
import { useRounds } from '@hooks/useRounds.ts';
import { useTest } from '@hooks/useTest';
import { useTimer } from '@hooks/useTimer';
import { useMatchTestAnimations } from '@modules/matchTest/hooks/useMatchTestAnimations.ts';
import { useMatchTestDrag } from '@modules/matchTest/hooks/useMatchTestDrag.ts';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';

export const useMatchTest = (
  dictionary: IDictionaryItem[],
): IUseMatchTestReturn => {
  const [isBlocked, setIsBlocked] = useState(true);
  const {
    animations,
    addAnimations,
    startObserve: startAnimationsObserve,
    stopObserve: stopAnimationsObserve,
  } = useMatchTestAnimations(id => onSuccess(id));
  const boardRef = useRef<HTMLDivElement>(null);
  const { round, setRound, currentRoundDictionary } = useRounds(dictionary);
  const test = useTest(currentRoundDictionary, {
    onStart: () => onStart(),
    onFinish: () => onFinish(),
  });
  const { onDragEnd, draggableItems } = useMatchTestDrag(test.items);
  const timer = useTimer();

  useEffect(() => {
    setIsBlocked(!test.isStarted);
  }, [test.isStarted]);

  const onSuccess = (id: IBoardItem['id'][]) => {
    test.setItems([...test.items.filter(card => !id.includes(card.id))]);
  };

  const onError = (id: IBoardItem['id'][]) => {};

  const onDragEndHandle = (e: DragEndEvent) =>
    onDragEnd(e, test.answers, addAnimations);

  const onStart = () => {
    startAnimationsObserve();
    timer.start();
  };
  const onFinish = () => {
    stopAnimationsObserve();
    timer.stop();
  };

  return {
    ...test,
    boardRef,
    round,
    onSuccess,
    onError,
    addAnimations,
    animations,
    start: test.start,
    onDragEnd: onDragEndHandle,
    draggableItems,
    time: timer.seconds,
  };
};
