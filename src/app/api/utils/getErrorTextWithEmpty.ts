import {
  BaseError,
  getErrorText,
  IGetErrorTextOptions,
  ServerError,
} from '@api';

export const getErrorTextWithEmpty = <T extends string>(
  errorType?: T | ServerError | BaseError,
  options?: IGetErrorTextOptions<T>,
) => {
  if (errorType) return getErrorText(errorType, options);
  else return '';
};
