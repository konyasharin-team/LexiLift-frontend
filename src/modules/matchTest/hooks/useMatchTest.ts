import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DictionaryItemSchemaInfer } from '@app-types';
import { IBoardItem } from '@components/Board';
import { Active, DragEndEvent, Over } from '@dnd-kit/core';
import { useRounds, useTest, useTimer } from '@hooks';
import { MATCH_CARD_ANIMATIONS_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useMatchTestAnimations } from '@modules/matchTest/hooks/useMatchTestAnimations.ts';
import { useMatchTestShowCardAnimation } from '@modules/matchTest/hooks/useMatchTestShowCardAnimation.ts';
import { useMatchTestStatisticAnimation } from '@modules/matchTest/hooks/useMatchTestStatisticAnimation.ts';
import { IDraggableMatchTestCard } from '@modules/matchTest/types/IDraggableMatchTestCard.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { onDragEnd } from '@modules/matchTest/utils/onDragEnd.ts';
import { createBaseSettings } from '@modules/sharedTest';
import { appPaths } from '@routes';
import { useActions, useAppSelector } from '@store';
import { getAnswers, toTime } from '@utils';

export const useMatchTest = (
  initialDictionary: DictionaryItemSchemaInfer[],
): IUseMatchTestReturn => {
  const navigate = useNavigate();
  const { setMatchTestResults } = useActions();
  const { settings } = useAppSelector(state => state.matchTest);
  const {
    animations,
    addAnimations,
    startObserve: startAnimationsObserve,
    stopObserve: stopAnimationsObserve,
  } = useMatchTestAnimations(
    id => onAfterSuccess(id),
    () => onAfterError(),
  );

  const { scope: successAnimationScope, play: playSuccessAnimation } =
    useMatchTestStatisticAnimation();
  const { scope: errorAnimationScope, play: playErrorAnimation } =
    useMatchTestStatisticAnimation();
  const {
    scope: showCardsAnimationScope,
    playShow: playShowCardsAnimation,
    playHide: playHideCardsAnimation,
  } = useMatchTestShowCardAnimation();

  const boardRef = useRef<HTMLDivElement>(null);
  const test = useTest(
    initialDictionary,
    settings ?? createBaseSettings(initialDictionary),
    {
      onStart: () => onStart(),
      onFinish: () => onFinish(),
    },
  );
  const { round, setRound, currentRoundItems, isLast } = useRounds(
    test.items,
    settings ?? createBaseSettings(initialDictionary),
  );

  const [draggableItems, setDraggableItems] = useState<
    IDraggableMatchTestCard[]
  >([]);
  const timer = useTimer({ intervalMs: 100 });

  useEffect(() => {
    setDraggableItems(currentRoundItems);
  }, [currentRoundItems]);

  useEffect(() => {
    const playHideCardsAnimationWithExit = async () => {
      if (!test.isStarted || draggableItems.length !== 0) return;
      await playHideCardsAnimation();
      if (!isLast) setRound(round + 1);
      else if (isLast) onFinish();
    };
    playHideCardsAnimationWithExit();
  }, [draggableItems, test.isStarted]);

  useEffect(() => {
    playHideCardsAnimation();
  }, []);

  useEffect(() => {
    if (test.isStarted) {
      playShowCardsAnimation();
    }
  }, [test.isStarted, round]);

  const onAfterSuccess = useCallback(
    (id: IBoardItem['id'][]) => {
      setDraggableItems([
        ...draggableItems.filter(card => !id.includes(card.id)),
      ]);
    },
    [draggableItems],
  );

  const onAfterError = useCallback(() => {}, []);

  const onSuccess = useCallback(
    (active: Active, over: Over) => {
      playSuccessAnimation();
      test.setStatistics({
        ...test.statistics,
        corrects: test.statistics.corrects + 1,
      });
      addAnimationsOnEvent([active.id, over.id], 'success');
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
    },
    [draggableItems, test.statistics],
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
    (e: DragEndEvent) =>
      onDragEnd(e, getAnswers(test.items), onSuccess, onError),
    [onSuccess, onError, initialDictionary],
  );

  const onStart = useCallback(() => {
    startAnimationsObserve();
    timer.start();
  }, []);

  const onFinish = useCallback(() => {
    stopAnimationsObserve();
    timer.stop();
    setMatchTestResults({
      time: toTime({ milliseconds: timer.milliseconds }),
      statistics: test.statistics,
    });
    navigate(appPaths.MATCH_TEST_RESULTS);
  }, [timer.milliseconds, test.statistics]);

  return {
    ...test,
    boardRef,
    round,
    animations,
    start: test.start,
    onDragEnd: onDragEndHandle,
    time: timer.milliseconds,
    successAnimationScope,
    errorAnimationScope,
    showCardsAnimationScope,
    items: draggableItems,
    setItems: setDraggableItems,
  };
};
