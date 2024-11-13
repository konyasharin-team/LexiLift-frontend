import { usePlayableAnimation } from '@hooks';
import { MATCH_TEST_SHOW_CARD_ANIMATION_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useAnimate } from 'framer-motion';

export const useMatchTestShowCardAnimation = () => {
  const [scope, animate] = useAnimate();
  const { play } = usePlayableAnimation(async () => await enter());

  const enter = async () => {
    await animate('div', { scale: 0 }, { duration: 0 });
    await animate(
      'div',
      {
        scale: 1,
      },
      { duration: MATCH_TEST_SHOW_CARD_ANIMATION_DURATION_SECONDS },
    );
  };

  return {
    scope,
    play,
  };
};
