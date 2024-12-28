import { useAnimate } from 'framer-motion';

export const useShowAchievementAnimation = () => {
  const [scope, animate] = useAnimate();

  const show = () => {
    animate(
      scope.current,
      {
        transform: 'translateY(0)',
        visibility: 'visible',
      },
      {
        duration: 500,
      },
    );
  };

  return {
    show,
    scope,
  };
};
