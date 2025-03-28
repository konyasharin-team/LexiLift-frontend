import { AppNode } from '@modules/nodesEditor/types/AppNode.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export const getPinById = (
  node: AppNode,
  id: IPin['id'],
  position: 'in' | 'out',
) => {
  return node.data[position].find(pin => pin.id === id);
};
