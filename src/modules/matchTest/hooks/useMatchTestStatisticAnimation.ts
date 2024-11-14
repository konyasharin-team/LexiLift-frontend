import { usePlayableAnimation } from '@hooks';
import { MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useAnimate } from 'framer-motion';

export const useMatchTestStatisticAnimation = () => {
  const [scope, animate] = useAnimate();
  const { play } = usePlayableAnimation(
    async () => await enter(),
    async () => await exit(),
  );

  const enter = async () => {
    await animate(
      scope.current,
      { scale: 1.05 },
      {
        duration: MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS,
      },
    );
  };

  const exit = async () => {
    await animate(
      scope.current,
      { scale: 1 },
      { duration: MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS },
    );
  };

  return {
    play,
    scope,
  };
};
