import { ReactNode } from 'react';

type Position = 'left' | 'center' | 'right';

export interface IContent<T extends string> {
  element: ReactNode;
  position: Position;
  key: T;
}
