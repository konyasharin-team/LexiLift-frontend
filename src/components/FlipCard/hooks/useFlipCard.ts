import { SetStateAction, useEffect } from 'react';
import { FlipCardSide } from '@components/FlipCard/FlipCard.tsx';
import { useToggle } from '@mantine/hooks';

export const useFlipCard = (
  initialValue: FlipCardSide = 'front',
): [
  FlipCardSide,
  (value?: SetStateAction<FlipCardSide> | undefined) => void,
] => {
  const [value, toggle] = useToggle<FlipCardSide>(['front', 'back']);

  useEffect(() => {
    toggle(initialValue);
  }, [initialValue]);

  return [value, toggle];
};
