import {
  IError,
  IResponseSchemas,
  Response,
  useApiDataParse,
  useApiError,
  UseMutationResult,
} from '@api';
import {
  useMutation as useTanstackMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

export const useMutation = <TResult, TErrors extends string, TData = void>(
  tanstackUseMutationOptions: UseMutationOptions<
    Response<TResult, IError<TErrors>>,
    Error,
    TData
  >,
  schemas: Partial<IResponseSchemas>,
  resetErrorToBase: boolean = false,
) => {
  const sender = useTanstackMutation(tanstackUseMutationOptions);
  const apiError = useApiError<TErrors>(
    sender.error,
    resetErrorToBase,
    schemas.errorSchema,
  );
  useApiDataParse([sender.data], schemas);

  return {
    sender: {
      ...sender,
      response: sender.data,
    } as UseMutationResult<Response<TResult, IError<TErrors>>, TData>,
    apiError,
  };
};
