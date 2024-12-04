import { useAnimate } from 'framer-motion';

const ANIMATION_DURATION_SECONDS = 0.3;

export const useModuleFlipCardsAnimation = () => {
  const [scope, animate] = useAnimate();

  const rotateLeft = async () => {
    if (!scope.current) return;
    await animate(
      scope.current,
      { transform: 'rotateY(45deg) translateX(80px)' },
      {
        duration: ANIMATION_DURATION_SECONDS / 2,
      },
    );
  };

  const rotateRight = async () => {
    if (!scope.current) return;
    await animate(
      scope.current,
      { transform: 'rotateY(-45deg) translateX(-80px)' },
      {
        duration: ANIMATION_DURATION_SECONDS / 2,
      },
    );
  };

  const unRotate = async () => {
    if (!scope.current) return;
    await animate(
      scope.current,
      { transform: 'rotateY(0) translateX(0)' },
      {
        duration: ANIMATION_DURATION_SECONDS / 2,
      },
    );
  };

  const playLeft = async () => {
    await rotateLeft();
    await unRotate();
  };

  const playRight = async () => {
    await rotateRight();
    await unRotate();
  };

  return {
    playLeft,
    playRight,
    scope,
  };
};
