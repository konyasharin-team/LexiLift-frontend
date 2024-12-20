import { useState } from 'react';

export const useQueue = <T>(initialQueue: T[]) => {
  const [queue, setQueue] = useState<T[]>(initialQueue);

  const addToQueue = (element: T) => {
    setQueue([element, ...queue]);
  };

  const getFromQueue = () => {
    let lastElement: T | undefined;
    if (queue.length > 0) {
      lastElement = queue[queue.length - 1];
      setQueue(queue.slice(0, queue.length - 1));
    }
    return lastElement;
  };

  return {
    addToQueue,
    getFromQueue,
    queue,
  };
};
