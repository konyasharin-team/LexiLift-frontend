import { useEffect, useRef, useState } from 'react';

export const useElementSize = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.borderBoxSize[0].inlineSize);
        setHeight(entry.borderBoxSize[0].blockSize);
      }
    });
    if (ref.current) resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  return {
    height,
    width,
    ref,
  };
};
