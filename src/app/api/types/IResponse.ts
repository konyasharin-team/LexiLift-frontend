export interface IResponse<T, P> {
  result?: T;
  error?: P;
  success: boolean;
}
