import {
  BaseError,
  getErrorText,
  IGetErrorTextOptions,
  ServerError,
} from '@api';
import { BASE_API_ERROR } from '@api/constants.ts';

export const getErrorTextWithEmpty = <T extends string>(
  errorType?: T | ServerError | BaseError,
  options?: IGetErrorTextOptions<T>,
) => {
  if (errorType) return getErrorText(errorType, options);
  else return BASE_API_ERROR;
};
