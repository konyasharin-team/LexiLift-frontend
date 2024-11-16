import { BaseError, IError, IResponse } from '@api';
import { isAxiosError } from 'axios';

export const handleError = <T extends string, P = undefined>(
  error: Error,
): IError<T | BaseError, P | undefined> => {
  if (
    isAxiosError<IResponse<undefined, IError<T, P>>>(error) &&
    error.response?.data.error
  ) {
    return error.response.data.error;
  }

  return {
    type: 'BASE',
    params: undefined,
    description: `Base error, server couldn't handle: ${error.message}`,
  };
};
