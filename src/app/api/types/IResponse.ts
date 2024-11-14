export interface IResponse<T, P = string> {
  result?: T;
  error?: P;
  success: boolean;
}
