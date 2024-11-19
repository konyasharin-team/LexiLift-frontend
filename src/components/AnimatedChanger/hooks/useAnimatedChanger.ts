import { useState } from 'react';
import { findByKey } from '@components/AnimatedChanger';
import { useAnimatedChangerAnimationsQueue } from '@components/AnimatedChanger/hooks/useAnimatedChangerAnimationsQueue.ts';
import { IContent } from '@components/AnimatedChanger/types/IContent.ts';

export const useAnimatedChanger = <T extends string>(
  initialContent: IContent<T>[],
) => {
  const [content, setContent] = useState<IContent<T>[]>(initialContent);
  const { addToQueue } = useAnimatedChangerAnimationsQueue<T>(params =>
    setPositionsByKey(params),
  );

  const setPositionsByKey = (params: IContent<T>[]) => {
    const newContent: IContent<T>[] = [];
    content.forEach(item => {
      const foundSameFromParams = findByKey(params, item.key);

      newContent.push({
        ...item,
        position: foundSameFromParams
          ? foundSameFromParams.position
          : item.position,
      });
    });
    setContent(newContent);
  };

  return { content, addToQueue };
};
