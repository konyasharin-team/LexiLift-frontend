import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDictionaryItem } from '@app-types';
import { IBoardItem } from '@components/Board';
import { Active, DragEndEvent, Over } from '@dnd-kit/core';
import { useRounds, useTimer } from '@hooks';
import { MATCH_CARD_ANIMATIONS_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useMatchTestAnimations } from '@modules/matchTest/hooks/useMatchTestAnimations.ts';
import { useMatchTestItemsWrapper } from '@modules/matchTest/hooks/useMatchTestItemsWrapper.ts';
import { useMatchTestShowCardAnimation } from '@modules/matchTest/hooks/useMatchTestShowCardAnimation.ts';
import { useMatchTestStatisticAnimation } from '@modules/matchTest/hooks/useMatchTestStatisticAnimation.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { onDragEnd } from '@modules/matchTest/utils/onDragEnd.ts';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';

export const useMatchTest = (
  initialDictionary: IDictionaryItem[],
): IUseMatchTestReturn => {
  const navigate = useNavigate();
  const { settings } = useAppSelector(state => state.matchTest);
  const {
    animations,
    addAnimations,
    startObserve: startAnimationsObserve,
    stopObserve: stopAnimationsObserve,
  } = useMatchTestAnimations(
    id => onAfterSuccess(id),
    id => onAfterError(id),
  );

  const { scope: successAnimationScope, play: playSuccessAnimation } =
    useMatchTestStatisticAnimation();
  const { scope: errorAnimationScope, play: playErrorAnimation } =
    useMatchTestStatisticAnimation();
  const { scope: showCardsAnimationScope, play: playShowCardsAnimation } =
    useMatchTestShowCardAnimation();

  const boardRef = useRef<HTMLDivElement>(null);
  const { round, setRound, currentRoundDictionary, isLast } = useRounds(
    initialDictionary,
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
  const timer = useTimer({ intervalMs: 100 });

  useEffect(() => {
    if (!settings) navigate(appPaths.MATCH_TEST_SETTINGS);
  }, []);

  useEffect(() => {
    if (!test.isStarted || test.items.length !== 0) return;
    if (!isLast) setRound(round + 1);
    else if (isLast) onFinish();
  }, [test.items, test.isStarted]);

  useLayoutEffect(() => {
    if (
      test.isStarted &&
      test.items.length === currentRoundDictionary.length * 2 &&
      currentRoundDictionary.length !== 0
    )
      playShowCardsAnimation();
  }, [test.items.length, test.isStarted]);

  const onAfterSuccess = useCallback(
    (id: IBoardItem['id'][]) => {
      test.setItems([...test.items.filter(card => !id.includes(card.id))]);
    },
    [test.items],
  );

  const onAfterError = useCallback((id: IBoardItem['id'][]) => {}, []);

  const onSuccess = useCallback(
    (active: Active, over: Over) => {
      playSuccessAnimation();
      test.setStatistics({
        ...test.statistics,
        corrects: test.statistics.corrects + 1,
      });
      addAnimationsOnEvent([active.id, over.id], 'success');
      test.setItems(
        test.items.map(item => {
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
    },
    [test.items, test.statistics],
  );

  const onError = useCallback(
    (active: Active, over: Over) => {
      playErrorAnimation();
      test.setStatistics({
        ...test.statistics,
        errors: test.statistics.errors + 1,
      });
      addAnimationsOnEvent([active.id, over.id], 'error');
    },
    [test.statistics],
  );

  const addAnimationsOnEvent = useCallback(
    (id: IBoardItem['id'][], type: IMatchTestAnimation['type']) => {
      const newAnimations: IMatchTestAnimation[] = [];
      id.forEach(idElem => {
        newAnimations.push({
          itemId: idElem,
          type: type,
          timeLeft: MATCH_CARD_ANIMATIONS_DURATION_SECONDS,
        });
      });
      addAnimations(newAnimations);
    },
    [],
  );

  const onDragEndHandle = useCallback(
    (e: DragEndEvent) => onDragEnd(e, test.answers, onSuccess, onError),
    [onSuccess, onError, test.answers],
  );

  const onStart = useCallback(() => {
    startAnimationsObserve();
    timer.start();
  }, []);

  const onFinish = useCallback(() => {
    stopAnimationsObserve();
    timer.stop();
  }, []);

  return {
    ...test,
    boardRef,
    round,
    onAfterSuccess,
    onAfterError,
    addAnimations,
    animations,
    start: test.start,
    onDragEnd: onDragEndHandle,
    time: timer.milliseconds,
    successAnimationScope,
    errorAnimationScope,
    showCardsAnimationScope,
    onSuccess,
    onError,
  };
};
