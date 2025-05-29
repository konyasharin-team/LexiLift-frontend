import { IRequestData } from '@api';

export const getResult = <TResult, TError>(
  data: Pick<IRequestData<TResult, TError>, 'response'>,
) => {
  return data.response?.data.result;
};
