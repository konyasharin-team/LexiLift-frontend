import { useApiError, UseMutationResult } from '@api';
import {
  useMutation as useTanstackMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

export const useMutation = <T, P extends string, K = void>(
  tanstackUseMutationOptions: UseMutationOptions<T, Error, K>,
) => {
  const sender = useTanstackMutation(tanstackUseMutationOptions);
  const apiError = useApiError<P>(sender.error);

  return {
    sender: {
      ...sender,
      response: sender.data,
    } as UseMutationResult<T, K>,
    apiError,
  };
};
