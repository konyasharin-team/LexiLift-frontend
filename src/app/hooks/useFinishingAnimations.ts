import { useEffect, useState } from 'react';

export const useFinishingAnimations = <T>(variant: T) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cashedVariant, setCashedVariant] = useState<T>(variant);

  useEffect(() => {
    if (!isAnimating && variant !== cashedVariant) setCashedVariant(variant);
  }, [variant, isAnimating]);

  const onAnimationStart = () => setIsAnimating(true);
  const onAnimationComplete = () => setIsAnimating(false);

  return {
    cashedVariant,
    attributes: {
      onAnimationStart,
      onAnimationComplete,
    },
  };
};
