import { useEffect, useState } from 'react';
import { FlipCardSide } from '@components/FlipCard/FlipCard.tsx';
import { useToggle } from '@mantine/hooks';

export const useFlipCard = (initialValue: FlipCardSide = 'front') => {
  const [currentSide, toggleCurrentSide] = useToggle<FlipCardSide>([
    'front',
    'back',
  ]);
  const [imgIsVisible, setImgIsVisible] = useState<boolean>(false);

  useEffect(() => {
    toggleCurrentSide(initialValue);
  }, [initialValue]);

  return {
    currentSide,
    toggleCurrentSide,
    imgIsVisible,
    setImgIsVisible,
  };
};
