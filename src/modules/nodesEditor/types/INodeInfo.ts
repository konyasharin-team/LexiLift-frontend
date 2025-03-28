import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export interface INodeInfo<TPin extends Omit<IPin, 'id'> = IPin>
  extends Record<string, unknown> {
  title: string;
  out: TPin[];
  in: TPin[];
  color: string;
  icon?: string;
}
