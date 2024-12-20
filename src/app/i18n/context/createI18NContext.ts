import { createContext } from 'react';
import { II18NContext } from '@i18n';

export const createI18NContext = <T extends string, P>() =>
  createContext<II18NContext<T, P> | null>(null);
