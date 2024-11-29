import {
  IError,
  IResponseSchemas,
  Response,
  useApiDataParse,
  useApiError,
} from '@api';
import { UseQueryResult } from '@api';
import {
  QueryKey,
  useQuery as useTanstackQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useQuery = <
  TResult,
  TErrors extends string,
  TKey extends QueryKey,
>(
  tanstackUseQueryOptions: UseQueryOptions<
    Response<TResult, IError<TErrors>>,
    Error,
    Response<TResult, IError<TErrors>>,
    TKey
  >,
  schemas: Partial<IResponseSchemas>,
  resetErrorToBase: boolean = false,
) => {
  const sender = useTanstackQuery<
    Response<TResult, IError<TErrors>>,
    Error,
    Response<TResult, IError<TErrors>>,
    TKey
  >(tanstackUseQueryOptions);
  const apiError = useApiError<TErrors>(
    sender.error,
    resetErrorToBase,
    schemas?.errorSchema,
  );
  useApiDataParse([sender.data], schemas);

  return {
    sender: {
      ...sender,
      response: sender.data,
    } as UseQueryResult<Response<TResult, IError<TErrors>>>,
    apiError,
  };
};
