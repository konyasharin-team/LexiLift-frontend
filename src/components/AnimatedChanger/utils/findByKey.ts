import { IContent } from '@components/AnimatedChanger';

export const findByKey = <T extends string>(
  contentToFind: IContent<T>[],
  key: IContent<T>['key'],
) => {
  return contentToFind.find(otherElem => otherElem.key === key);
};
