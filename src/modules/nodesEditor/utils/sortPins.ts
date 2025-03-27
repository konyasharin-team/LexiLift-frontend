import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export const sortPins = (pin1: IPin, pin2: IPin) => {
  if (pin1.type === 'transition' && pin2.type === 'base') return -1;
  else if (pin1.type === 'base' && pin2.type === 'transition') return 1;
  return 0;
};
