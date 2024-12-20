export interface IError<T = string, P = undefined> {
  type: T;
  description: string;
  params: P;
}
