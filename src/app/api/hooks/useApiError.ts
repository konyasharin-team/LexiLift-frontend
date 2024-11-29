import { useEffect, useState } from 'react';
import { BaseError, IError, ServerError } from '@api';
import { ZodType } from 'zod';

import { handleError } from '../utils/handleError';

export const useApiError = <T extends string, P = undefined>(
  e: Error | null,
  resetErrorToBase: boolean,
  errorSchema?: ZodType,
) => {
  const [error, setError] = useState<IError<
    T | ServerError | BaseError,
    P | undefined
  > | null>(null);

  useEffect(() => {
    if (e) setError(handleError<T, P>(e, resetErrorToBase, errorSchema));
    else setError(null);
  }, [e]);

  return error;
};
