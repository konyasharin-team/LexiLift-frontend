import { useState } from 'react';
import { findByKey } from '@components/AnimatedChanger';
import { IContent } from '@components/AnimatedChanger/types/IContent.ts';

export const useAnimatedChanger = <T extends string>(
  initialContent: IContent<T>[],
) => {
  const [content, setContent] = useState<IContent<T>[]>(initialContent);

  const setPositionsByKey = (
    params: { key: T; newPosition: IContent<T>['position'] }[],
  ) => {
    const newContent: IContent<T>[] = [];
    content.forEach(item => {
      const foundSameFromParams = findByKey(params, item.key);

      newContent.push({
        ...item,
        position: foundSameFromParams
          ? foundSameFromParams.newPosition
          : item.position,
      });
    });
    setContent(newContent);
  };

  const getPositionByKey = (key: T) => {
    return content.find(item => item.key === key)?.position;
  };

  return { content, setPositionsByKey, getPositionByKey };
};
