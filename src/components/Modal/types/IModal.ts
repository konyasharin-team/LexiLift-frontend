import { ReactNode } from 'react';

export interface IModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  children?: ReactNode;
}
