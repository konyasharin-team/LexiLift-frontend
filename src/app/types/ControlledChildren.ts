import { ReactNode } from 'react';

export type ControlledChildren<TResult> =
  | ((result?: TResult) => ReactNode)
  | ReactNode;
