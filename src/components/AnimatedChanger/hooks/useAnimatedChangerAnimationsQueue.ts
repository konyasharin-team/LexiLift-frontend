import { useEffect, useState } from 'react';
import { IContent } from '@components/AnimatedChanger';
import { useQueue } from '@hooks';
import { useInterval } from '@mantine/hooks';

export const useAnimatedChangerAnimationsQueue = <T extends string>(
  setPositions: (params: IContent<T>[]) => void,
  timeToDelta: number = 0.5,
) => {
  const { getFromQueue, addToQueue, queue } = useQueue<IContent<T>[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const { start, active, stop } = useInterval(
    () => onUpdate(),
    timeToDelta * 1000,
  );

  const onUpdate = () => {
    if (queue.length === 0) return setIsAnimating(false);

    const element = getFromQueue();
    if (element) {
      setPositions(element);
      setIsAnimating(true);
    }
  };

  const startHandle = () => {
    start();
    onUpdate();
  };

  useEffect(() => {
    if (queue.length === 0 && !isAnimating) stop();
    else if (queue.length > 0 && !active) startHandle();
  }, [queue.length, isAnimating]);

  return {
    addToQueue,
  };
};
