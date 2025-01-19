import { PinType } from '@modules/nodesEditor/types/PinType.ts';

export interface IPin {
  type: PinType;
  color: {
    outColor: string;
    innerColor: string;
  };
}
