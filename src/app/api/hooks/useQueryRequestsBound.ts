import { useState } from 'react';

export const useQueryRequestsBound = <T extends string>(keys: T[]) => {
  const [boundedRequests] = useState<T[]>(keys);

  const getRequestOptions = (key: T): { enabled: boolean } => {
    return {
      enabled: !boundedRequests.some(keyToCompare => keyToCompare === key),
    };
  };

  return {
    getRequestOptions,
  };
};
