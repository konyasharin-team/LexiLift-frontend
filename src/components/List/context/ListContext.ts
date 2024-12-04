import { createContext } from 'react';
import { IListProps } from '@components/List';

export const ListContext = createContext<Pick<
  IListProps,
  'span' | 'height'
> | null>(null);
