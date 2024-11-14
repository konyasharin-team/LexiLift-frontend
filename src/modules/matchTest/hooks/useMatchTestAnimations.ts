import { useCallback, useEffect, useState } from 'react';
import { IBoardItem } from '@components/Board';
import { useInterval } from '@mantine/hooks';
import { MATCH_TEST_ANIMATION_UPDATE_TIME } from '@modules/matchTest/constants.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';

export const useMatchTestAnimations = (
  onAfterSuccess: (id: IBoardItem['id'][]) => void,
  onAfterError: (id: IBoardItem['id'][]) => void,
) => {
  const {
    start: startObserve,
    stop: stopObserve,
    active: isObserve,
  } = useInterval(() => onUpdate(), MATCH_TEST_ANIMATION_UPDATE_TIME * 1000);
  const [animations, setAnimations] = useState<IMatchTestAnimation[]>([]);

  const onUpdate = () => {
    let newAnimations = animations.map(animation => {
      return {
        ...animation,
        timeLeft: Math.max(
          0,
          animation.timeLeft - MATCH_TEST_ANIMATION_UPDATE_TIME,
        ),
      };
    });
    onAfterSuccess(filterFinishedByType(newAnimations, 'success'));
    onAfterError(filterFinishedByType(newAnimations, 'error'));
    newAnimations = newAnimations.filter(animation => animation.timeLeft > 0);
    setAnimations(newAnimations);
  };

  const addAnimations = useCallback((newAnimations: IMatchTestAnimation[]) => {
    setAnimations(prev => [
      ...prev,
      ...newAnimations.filter(
        newAnimation =>
          !animations.find(
            animation => animation.itemId === newAnimation.itemId,
          ),
      ),
    ]);
  }, []);

  const filterFinishedByType = (
    animations: IMatchTestAnimation[],
    type: IMatchTestAnimation['type'],
  ) => {
    return animations
      .filter(animation => animation.timeLeft === 0 && animation.type === type)
      .map(animation => animation.itemId);
  };

  useEffect(() => {
    if (animations.length === 0) return stopObserve();
    else if (animations.length > 0 && !isObserve) startObserve();
  }, [animations, isObserve]);

  return {
    animations,
    startObserve,
    stopObserve,
    addAnimations,
  };
};
