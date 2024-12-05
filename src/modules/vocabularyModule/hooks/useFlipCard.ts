import { useEffect, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import { FlipCardSide } from '@modules/vocabularyModule/components/FlipCard/FlipCard.tsx';

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
