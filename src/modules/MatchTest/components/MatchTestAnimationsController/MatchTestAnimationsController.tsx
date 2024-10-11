import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { MATCH_TEST_ANIMATION_UPDATE_TIME } from '@modules/MatchTest/constants.ts';
import { IMatchTestAnimation } from '@modules/MatchTest/types/IMatchTestAnimation.ts';

interface IMatchTestAnimationsControllerProps {
  children?: ReactNode;
}

export const MatchTestAnimationsContext = createContext<{
  animations: IMatchTestAnimation[];
  start?: () => void;
  addAnimations?: (animations: IMatchTestAnimation[]) => void;
}>({
  animations: [],
});

export const MatchTestAnimationsController: FC<
  IMatchTestAnimationsControllerProps
> = props => {
  const { start, stop, active } = useInterval(
    () => onUpdate(),
    MATCH_TEST_ANIMATION_UPDATE_TIME * 1000,
  );
  const [waitingAnimations, setWaitingAnimations] = useState<
    IMatchTestAnimation[]
  >([]);
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
    newAnimations = newAnimations.filter(animation => animation.timeLeft > 0);
    setAnimations(newAnimations);
  };

  const addWaitingAnimations = (animations: IMatchTestAnimation[]) => {
    setWaitingAnimations([...waitingAnimations, ...animations]);
  };

  const deleteWaitingAnimation = (animation: IMatchTestAnimation) => {
    setWaitingAnimations(
      waitingAnimations.filter(checkAnimation => {
        return !(
          checkAnimation.itemId === animation.itemId &&
          checkAnimation.type === animation.type
        );
      }),
    );
  };

  const waitingAnimationsAreCanPlay = () => {
    return waitingAnimations.filter(animation => {
      return !animations.find(
        checkAnimation => checkAnimation.itemId === animation.itemId,
      );
    });
  };

  const moveWaitingAnimationsToActive = () => {
    waitingAnimationsAreCanPlay().forEach(animation => {
      deleteWaitingAnimation(animation);
      setAnimations([...animations, animation]);
    });
  };

  useEffect(() => {
    if (animations.length === 0) return stop();
    else if (animations.length > 0 && !active) start();
    if (active) moveWaitingAnimationsToActive();
  }, [animations, active]);

  useEffect(() => {
    if (!active && waitingAnimations.length > 0) start();
    if (active) moveWaitingAnimationsToActive();
  }, [waitingAnimations, active]);

  return (
    <MatchTestAnimationsContext.Provider
      value={{
        animations,
        start,
        addAnimations: addWaitingAnimations,
      }}
    >
      {props.children}
    </MatchTestAnimationsContext.Provider>
  );
};
