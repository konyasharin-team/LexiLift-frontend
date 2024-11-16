import { DependencyList, useEffect, useState } from 'react';
import { findByKey } from '@components/AnimatedChanger';
import { IContent } from '@components/AnimatedChanger/types/IContent.ts';

export const useAnimatedChanger = <T extends string>(
  initialContent: IContent<T>[],
  deps: DependencyList,
) => {
  const [content, setContent] = useState<IContent<T>[]>(initialContent);

  useEffect(() => {
    setContent(
      content.map(item => {
        const foundSameFromInitial = findByKey(initialContent, item.key);
        return {
          ...item,
          element: foundSameFromInitial?.element ?? item.element,
        };
      }),
    );
  }, deps);

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
  return { content, setPositionsByKey };
};
