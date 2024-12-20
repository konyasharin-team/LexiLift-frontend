import { UseMutationResult as UseTanstackMutationResult } from '@tanstack/react-query';

export type UseMutationResult<T, P = void> = Omit<
  UseTanstackMutationResult<T, Error, P>,
  'data'
> & { response: UseTanstackMutationResult<T, Error, P>['data'] };
