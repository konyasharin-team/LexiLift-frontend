import { IError } from '@api/types/IError.ts';

export interface IResponse<T, P extends IError = IError> {
  result?: T;
  error?: P;
  success: boolean;
}
