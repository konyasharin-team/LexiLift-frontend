import { useCallback, useEffect, useState } from 'react';

export const usePlayableAnimation = (
  enterFunc: () => Promise<void>,
  exitFunc?: () => Promise<void>,
) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const enter = useCallback(async () => {
    await enterFunc();
    setIsPlaying(false);
  }, []);

  const exit = useCallback(async () => {
    await exitFunc?.();
  }, []);

  const play = useCallback(() => setIsPlaying(true), []);

  useEffect(() => {
    if (isPlaying) enter();
    else exit();
  }, [isPlaying]);

  return {
    play,
    isPlaying,
  };
};
