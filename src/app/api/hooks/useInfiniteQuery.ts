import {
  IError,
  IResponseSchemas,
  Response,
  useApiDataParse,
  useApiError,
} from '@api';
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

export const useInfiniteQuery = <TResult, TErrors extends string>(
  {
    initialPageParam,
    getNextPageParam,
    ...options
  }: Partial<
    Pick<
      InfiniteOptions<Response<TResult, IError<TErrors>>>,
      'initialPageParam' | 'getNextPageParam'
    >
  > &
    Omit<
      InfiniteOptions<Response<TResult, IError<TErrors>>>,
      'initialPageParam' | 'getNextPageParam'
    >,
  schemas: Partial<IResponseSchemas>,
  resetErrorToBase: boolean = false,
) => {
  const sender = useTanstackInfiniteQuery({
    initialPageParam: initialPageParam ?? 0,
    getNextPageParam:
      getNextPageParam ??
      (() => {
        return 1; // заглушка
      }),
    ...options,
  });
  const apiError = useApiError<TErrors>(
    sender.error,
    resetErrorToBase,
    schemas.errorSchema,
  );
  useApiDataParse(sender.data?.pages, schemas);

  return {
    sender,
    apiError,
  };
};
