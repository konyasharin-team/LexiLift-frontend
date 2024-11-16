import { useEffect, useState } from 'react';
import { BaseError, IError } from '@api';

import { handleError } from '../utils/handleError';

export const useApiError = <T extends string, P = undefined>(
  e: Error | null,
) => {
  const [error, setError] = useState<IError<
    T | BaseError,
    P | undefined
  > | null>(null);

  useEffect(() => {
    if (e) setError(handleError<T, P>(e));
    else setError(null);
  }, [e]);

  return error;
};
