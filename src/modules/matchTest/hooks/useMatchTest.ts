import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDictionaryItem } from '@app-types';
import { IBoardItem } from '@components/Board';
import { DragEndEvent } from '@dnd-kit/core';
import { useRounds, useTimer } from '@hooks';
import { useMatchTestAnimations } from '@modules/matchTest/hooks/useMatchTestAnimations.ts';
import { useMatchTestDrag } from '@modules/matchTest/hooks/useMatchTestDrag.ts';
import { useMatchTestItemsWrapper } from '@modules/matchTest/hooks/useMatchTestItemsWrapper.ts';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';

export const useMatchTest = (
  dictionary: IDictionaryItem[],
): IUseMatchTestReturn => {
  const [isBlocked, setIsBlocked] = useState(true);
  const navigate = useNavigate();
  const { settings } = useAppSelector(state => state.matchTest);
  const {
    animations,
    addAnimations,
    startObserve: startAnimationsObserve,
    stopObserve: stopAnimationsObserve,
  } = useMatchTestAnimations(id => onSuccess(id));
  const boardRef = useRef<HTMLDivElement>(null);
  const { round, setRound, currentRoundDictionary } = useRounds(
    dictionary,
    settings?.wordsPerRound,
  );
  const test = useMatchTestItemsWrapper([
    currentRoundDictionary,
    {
      onStart: () => onStart(),
      onFinish: () => onFinish(),
      isNeedShuffle: true,
    },
  ]);
  console.log(test.items)
  const { onDragEnd } = useMatchTestDrag(test.items, test.setItems);
  const timer = useTimer();

  useEffect(() => {
    setIsBlocked(!test.isStarted);
  }, [test.isStarted]);

  useEffect(() => {
    if (!settings) navigate(appPaths.MATCH_TEST_SETTINGS);
  }, []);

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
    time: timer.seconds,
  };
};
