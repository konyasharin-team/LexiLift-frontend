import { MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useAnimate } from 'framer-motion';

export const useMatchTestStatisticAnimation = () => {
  const [scope, animate] = useAnimate();

  const scale = async () => {
    if (!scope.current) return;
    await animate(
      scope.current,
      { scale: 1.05 },
      {
        duration: MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS,
      },
    );
  };

  const unscale = async () => {
    if (!scope.current) return;
    await animate(
      scope.current,
      { scale: 1 },
      { duration: MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS },
    );
  };

  const play = async () => {
    await scale();
    await unscale();
  };

  return {
    play,
    scope,
  };
};
