import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

export const transformPages = <T, P = void>(
  sender: UseInfiniteQueryResult<InfiniteData<T>, Error>,
  onIterate: (page: T) => P,
): P[] | undefined => {
  return sender.data?.pages.map(page => {
    return onIterate(page);
  });
};
