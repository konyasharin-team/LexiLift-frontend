import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDictionaryItem } from '@app-types';
import { IBoardItem } from '@components/Board';
import { Active, DragEndEvent, Over } from '@dnd-kit/core';
import { useRounds, useTimer } from '@hooks';
import { MATCH_CARD_ANIMATIONS_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useMatchTestAnimations } from '@modules/matchTest/hooks/useMatchTestAnimations.ts';
import { useMatchTestItemsWrapper } from '@modules/matchTest/hooks/useMatchTestItemsWrapper.ts';
import { useMatchTestStatisticAnimation } from '@modules/matchTest/hooks/useMatchTestStatisticAnimation.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { onDragEnd } from '@modules/matchTest/utils/onDragEnd.ts';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';

export const useMatchTest = (
  dictionary: IDictionaryItem[],
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
  const {
    styles: successAnimationStyles,
    api: successAnimationApi,
    settings: successAnimationSettings,
  } = useMatchTestStatisticAnimation();
  const {
    styles: errorAnimationStyles,
    api: errorAnimationApi,
    settings: errorAnimationSettings,
  } = useMatchTestStatisticAnimation();
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
  const timer = useTimer();

  useEffect(() => {
    if (!settings) navigate(appPaths.MATCH_TEST_SETTINGS);
  }, []);

  const onAfterSuccess = (id: IBoardItem['id'][]) => {
    test.setItems([...test.items.filter(card => !id.includes(card.id))]);
  };

  const onAfterError = (id: IBoardItem['id'][]) => {};

  const onSuccess = (active: Active, over: Over) => {
    successAnimationApi.start(successAnimationSettings);
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
  };

  const onError = (active: Active, over: Over) => {
    errorAnimationApi.start(errorAnimationSettings);
    test.setStatistics({
      ...test.statistics,
      errors: test.statistics.errors + 1,
    });
    addAnimationsOnEvent([active.id, over.id], 'error');
  };

  const addAnimationsOnEvent = (
    id: IBoardItem['id'][],
    type: IMatchTestAnimation['type'],
  ) => {
    const newAnimations: IMatchTestAnimation[] = [];
    id.forEach(idElem => {
      newAnimations.push({
        itemId: idElem,
        type: type,
        timeLeft: MATCH_CARD_ANIMATIONS_DURATION_SECONDS,
      });
    });
    addAnimations(newAnimations);
  };

  const onDragEndHandle = (e: DragEndEvent) =>
    onDragEnd(e, test.answers, onSuccess, onError);

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
    onAfterSuccess,
    onAfterError,
    addAnimations,
    animations,
    start: test.start,
    onDragEnd: onDragEndHandle,
    time: timer.seconds,
    successAnimationStyles,
    errorAnimationStyles,
    onSuccess,
    onError,
  };
};
