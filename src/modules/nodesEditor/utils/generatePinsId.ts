import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export const generatePinsId = <
  T extends Pick<INodeInfo<Omit<IPin, 'id'>>, 'out' | 'in'>,
>(
  nodeId: string,
  data: T,
) => {
  const generateForGroup = (group: 'in' | 'out'): IPin[] => {
    return data[group].map((item, i) => ({
      ...item,
      id: `${group}-${nodeId}-${i}`,
    }));
  };
  return {
    ...data,
    in: generateForGroup('in'),
    out: generateForGroup('out'),
  };
};
