import { BaseError, RequestErrors, ServerError } from '@api';
import { BASE_API_ERROR, SERVER_API_ERROR } from '@api/constants.ts';

export interface IGetErrorTextOptions<T extends string> {
  requestErrors?: RequestErrors<T>;
  replacedBaseError?: string;
}

export const getErrorText = <T extends string>(
  errorType: T | ServerError | BaseError,
  options?: IGetErrorTextOptions<T>,
) => {
  const baseError = options?.replacedBaseError
    ? options.replacedBaseError
    : BASE_API_ERROR;
  if (errorType === 'SERVER') return SERVER_API_ERROR;
  else if (errorType === 'BASE') return baseError;
  else
    return options?.requestErrors
      ? options.requestErrors[errorType]
      : baseError;
};
