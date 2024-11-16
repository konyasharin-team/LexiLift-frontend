import { BaseError, RequestErrors } from '@api';
import { BASE_API_ERROR } from '@api/constants.ts';

export const getErrorText = <T extends string>(
  errorType: T | BaseError,
  requestErrors: RequestErrors<T>,
) => {
  if (errorType === 'BASE') return BASE_API_ERROR;
  else return requestErrors[errorType];
};
