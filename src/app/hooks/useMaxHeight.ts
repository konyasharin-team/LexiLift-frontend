import { useEffect, useRef, useState } from 'react';

export const useMaxHeight = () => {
  const blockRefs = useRef<HTMLElement[]>([]);

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const heights = blockRefs.current.map(
      ref => ref.getBoundingClientRect().height,
    );
    setMaxHeight(Math.max(...heights));
  }, []);
  return { maxHeight, blockRefs };
};
