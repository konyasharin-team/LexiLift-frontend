import { IHandler } from '../types/IHandler';
import { IPin } from '../types/IPin';

export interface INodeInfo<TPin extends Omit<IPin, 'id'> = IPin>
  extends Record<string, unknown> {
  title: string;
  out: TPin[];
  in: TPin[];
  color: string;
  handler: IHandler;
  icon?: string;
}
