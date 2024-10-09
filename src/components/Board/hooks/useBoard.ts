import { useEffect, useRef, useState } from 'react';
import { IBoardSize } from '@components/Board';

export const useBoard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<IBoardSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      setSize({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
      });
    }
  }, [ref.current]);

  return { size, ref };
};
