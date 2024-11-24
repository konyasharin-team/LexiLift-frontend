import { useApiError } from '@api';
import { UseQueryResult } from '@api';
import {
  QueryKey,
  useQuery as useTanstackQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useQuery = <T, P extends string, K extends QueryKey>(
  tanstackUseQueryOptions: UseQueryOptions<T, Error, T, K>,
) => {
  const sender = useTanstackQuery<T, Error, T, K>(tanstackUseQueryOptions);
  const apiError = useApiError<P>(sender.error);

  return {
    sender: {
      ...sender,
      response: sender.data,
    } as UseQueryResult<T>,
    apiError,
  };
};
