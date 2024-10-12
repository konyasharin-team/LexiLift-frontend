import { useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { MATCH_TEST_ANIMATION_UPDATE_TIME } from '@modules/MatchTest/constants.ts';
import { IMatchTestAnimation } from '@modules/MatchTest/types/IMatchTestAnimation.ts';
import { IUseMatchTestReturn } from '@modules/MatchTest/types/IUseMatchTestReturn.ts';

export const useMatchTestAnimations = (
  onSuccess: IUseMatchTestReturn['onSuccess'],
) => {
  const { start, stop, active } = useInterval(
    () => onUpdate(),
    MATCH_TEST_ANIMATION_UPDATE_TIME * 1000,
  );
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
    onSuccess(
      newAnimations
        .filter(
          animation => animation.timeLeft === 0 && animation.type === 'success',
        )
        .map(animation => animation.itemId),
    );
    newAnimations = newAnimations.filter(animation => animation.timeLeft > 0);
    setAnimations(newAnimations);
  };

  const addAnimations = (newAnimations: IMatchTestAnimation[]) => {
    setAnimations([
      ...animations,
      ...newAnimations.filter(
        newAnimation =>
          !animations.find(
            animation => animation.itemId === newAnimation.itemId,
          ),
      ),
    ]);
  };

  useEffect(() => {
    if (animations.length === 0) return stop();
    else if (animations.length > 0 && !active) start();
  }, [animations, active]);

  return {
    animations,
    start,
    addAnimations,
  };
};
