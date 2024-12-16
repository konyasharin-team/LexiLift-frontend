import {
  IError,
  IResponseSchemas,
  Response,
  useApiDataParse,
  useApiError,
} from '@api';
import { PaginationWithoutContentSchemaInfer } from '@api/types';
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

export const useInfiniteQuery = <
  TResult extends PaginationWithoutContentSchemaInfer,
  TErrors extends string,
>(
  {
    initialPageParam,
    getNextPageParam,
    ...queryOptions
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
  schemas?: Partial<IResponseSchemas>,
) => {
  const sender = useTanstackInfiniteQuery({
    initialPageParam: initialPageParam ?? 0,
    getNextPageParam:
      getNextPageParam ??
      (lastPage => {
        const result = lastPage.data.result;
        if (result)
          return result.currentPage < result.totalPages
            ? result.currentPage + 1
            : undefined;
        return 0;
      }),
    ...queryOptions,
  });
  const apiError = useApiError<TErrors>(sender.error, schemas?.errorSchema);
  useApiDataParse(sender.data?.pages, schemas);

  return {
    sender,
    apiError,
  };
};
