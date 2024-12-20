import { MATCH_TEST_SHOW_CARD_ANIMATION_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useAnimate } from 'framer-motion';

export const useMatchTestShowCardAnimation = () => {
  const [scope, animate] = useAnimate();

  const show = async () => {
    if (!scope.current) return;
    await animate(
      scope.current,
      {
        scale: 1,
      },
      { duration: MATCH_TEST_SHOW_CARD_ANIMATION_DURATION_SECONDS },
    );
  };

  const hide = async () => {
    if (!scope.current) return;
    await animate(scope.current, { scale: 0 }, { duration: 0.01 });
  };

  return {
    scope,
    playShow: show,
    playHide: hide,
  };
};
