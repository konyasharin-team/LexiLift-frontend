import { useApiError } from '@api';
import {
  useQuery as useTanstackQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { UseQueryResult } from '@api';

export const useQuery = <T, P extends string>(
  tanstackUseQueryOptions: UseQueryOptions<T, Error, T>,
) => {
  const sender = useTanstackQuery<T, Error, T>(tanstackUseQueryOptions);
  const apiError = useApiError<P>(sender.error);

  return {
    sender: {
      ...sender,
      response: sender.data,
    } as UseQueryResult<T>,
    apiError,
  };
};
