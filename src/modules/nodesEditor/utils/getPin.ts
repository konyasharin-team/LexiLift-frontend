import { PIN_TRANSITION, PINS } from '@modules/nodesEditor';
import { PinType } from '@modules/nodesEditor/types/PinType.ts';

export const getPin = (type: PinType) => {
  return PINS.find(pin => pin.type === type) ?? PIN_TRANSITION;
};
