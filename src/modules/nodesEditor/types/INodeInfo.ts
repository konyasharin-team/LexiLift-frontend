import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export interface INodeInfo extends Record<string, unknown> {
  title: string;
  out: IPin[];
  in: IPin[];
}
