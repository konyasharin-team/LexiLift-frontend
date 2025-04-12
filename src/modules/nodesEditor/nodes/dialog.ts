import { baseHandler } from '../handlers';
import { INodeInfo } from '../types/INodeInfo';
import { IPin } from '../types/IPin';
import { getPin } from '../utils/getPin';

export const dialogNode: INodeInfo<Omit<IPin, 'id'>> = {
  title: 'Dialog',
  in: [getPin('transition'), getPin('boolean'), getPin('boolean')],
  out: [
    getPin('transition'),
    getPin('boolean'),
    getPin('boolean'),
    getPin('boolean'),
  ],
  color: '#6381e0',
  handler: baseHandler,
};
