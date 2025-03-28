import { PinType } from '@modules/nodesEditor/types/PinType.ts';

type Color = {
  outColor: string;
  innerColor: string;
};

export interface IPin {
  id: string;
  type: PinType;
  color: Color;
  size: number;
  title: string;
  description: string;
  withManyConnections?: boolean;
}
