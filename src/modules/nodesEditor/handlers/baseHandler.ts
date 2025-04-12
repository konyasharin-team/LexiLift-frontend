import { IHandler } from '../types/IHandler';

import { baseHandlePins } from './baseHandlePins';

export const baseHandler: IHandler = {
  handlePins: baseHandlePins,
};
