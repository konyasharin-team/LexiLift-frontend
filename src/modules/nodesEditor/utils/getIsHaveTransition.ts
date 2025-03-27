import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export const getIsHaveTransition = (pins: IPin[]) => {
  return !!pins.find(pin => pin.type === 'transition');
};
