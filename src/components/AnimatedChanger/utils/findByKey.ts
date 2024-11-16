import { IContent } from '@components/AnimatedChanger';

export const findByKey = <T extends string, P extends Pick<IContent<T>, 'key'>>(
  contentToFind: P[],
  key: IContent<T>['key'],
) => {
  return contentToFind.find(otherElem => otherElem.key === key);
};
