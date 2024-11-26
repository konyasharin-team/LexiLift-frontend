import { BaseError, IError, IResponse } from '@api';
import { isAxiosError } from 'axios';
import { ZodType } from 'zod';

export const handleError = <T extends string, P = undefined>(
  error: Error,
  errorSchema?: ZodType,
): IError<T | BaseError, P | undefined> => {
  if (
    isAxiosError<IResponse<undefined, IError<T, P>>>(error) &&
    error.response?.data.error
  ) {
    if (errorSchema) return errorSchema.parse(error.response.data.error);
    else return error.response.data.error;
  }

  return {
    type: 'BASE',
    params: undefined,
    description: `Base error, server couldn't handle: ${error.message}`,
  };
};
