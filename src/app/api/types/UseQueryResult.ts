import { UseQueryResult as UseTanstackQueryResult } from '@tanstack/react-query';

export type UseQueryResult<T> = Omit<
  UseTanstackQueryResult<T, Error>,
  'data'
> & {
  response: UseTanstackQueryResult<T, Error>['data'];
};
