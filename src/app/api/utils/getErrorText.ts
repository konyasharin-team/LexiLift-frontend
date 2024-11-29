import { BaseError, RequestErrors, ServerError } from '@api';
import { BASE_API_ERROR, SERVER_API_ERROR } from '@api/constants.ts';

export const getErrorText = <T extends string>(
  errorType: T | ServerError | BaseError,
  requestErrors: RequestErrors<T>,
  baseError?: string,
) => {
  if (errorType === 'SERVER') return SERVER_API_ERROR;
  else if (errorType === 'BASE') return baseError ? baseError : BASE_API_ERROR;
  else return requestErrors[errorType];
};
