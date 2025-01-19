import { PinType } from '@modules/nodesEditor/types/PinType.ts';

export interface IPin {
  id: string;
  type: PinType;
  color: {
    outColor: string;
    innerColor: string;
  };
}
