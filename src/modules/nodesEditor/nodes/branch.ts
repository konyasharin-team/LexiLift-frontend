import { baseHandler } from '../handlers';
import { INodeInfo } from '../types/INodeInfo';
import { IPin } from '../types/IPin';
import { getPin } from '../utils/getPin';

export const branchNode: INodeInfo<Omit<IPin, 'id'>> = {
  title: 'Branch',
  in: [getPin('transition'), getPin('boolean')],
  out: [getPin('transition'), getPin('transition')],
  color: '#9f9a9a',
  handler: baseHandler,
};
