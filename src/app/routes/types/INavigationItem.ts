import { ReactNode } from 'react';

export interface INavigationItem {
  icon: ReactNode;
  to: string;
  text: string;
  pathsToCompare?: string[];
}
