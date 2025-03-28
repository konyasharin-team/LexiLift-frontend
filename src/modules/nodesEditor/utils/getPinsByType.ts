import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { PinType } from '@modules/nodesEditor/types/PinType.ts';

export const getPinsByType = (pins: IPin[], type: PinType) => {
  return pins.filter(pin => pin.type === type);
};
