import { ReactNode } from 'react';

export const getControlledChildren = <TResult>(
  result: TResult | undefined,
  children: ((result?: TResult) => ReactNode) | ReactNode,
) => {
  return children && typeof children === 'function'
    ? children(result)
    : children;
};
