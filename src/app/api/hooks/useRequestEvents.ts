import { useEffect } from 'react';
import { Response } from '@api/types';

interface IRequestData<TResult, TError> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  response?: Response<TResult, TError>;
}

interface IUseRequestEventsOptions<TResult> {
  onLoading?: () => void;
  onError?: () => void;
  onSuccess?: (result: TResult) => void;
}

export const useRequestEvents = <TResult, TError>(
  data: IRequestData<TResult, TError>,
  options?: IUseRequestEventsOptions<TResult>,
) => {
  useEffect(() => {
    if (data.isError) options?.onError?.();
    else if (data.isLoading) options?.onLoading?.();
    else if (data.isSuccess && data.response && data.response.data.result)
      options?.onSuccess?.(data.response.data.result);
  }, [data.isLoading, data.isError, data.isSuccess]);
};
