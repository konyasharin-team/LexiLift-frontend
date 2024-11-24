import { useApiError } from '@api';
import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery as useTanstackInfiniteQuery,
} from '@tanstack/react-query';

type InfiniteOptions<T> = UndefinedInitialDataInfiniteOptions<
  T,
  Error,
  InfiniteData<T>,
  QueryKey,
  number
>;

export const useInfiniteQuery = <T, P extends string>({
  initialPageParam,
  getNextPageParam,
  ...options
}: Partial<Pick<InfiniteOptions<T>, 'initialPageParam' | 'getNextPageParam'>> &
  Omit<InfiniteOptions<T>, 'initialPageParam' | 'getNextPageParam'>) => {
  const sender = useTanstackInfiniteQuery({
    initialPageParam: initialPageParam ?? 0,
    getNextPageParam:
      getNextPageParam ??
      (() => {
        return 1; // заглушка
      }),
    ...options,
  });
  const apiError = useApiError<P>(sender.error);

  return {
    sender,
    apiError,
  };
};
