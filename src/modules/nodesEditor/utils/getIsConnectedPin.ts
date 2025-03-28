import { AppEdge } from '@modules/nodesEditor/types/AppEdge.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export const getIsConnectedPin = (edges: AppEdge[], pin: IPin) => {
  return !!edges.find(
    edge => edge.sourceHandle === pin.id || edge.targetHandle === pin.id,
  );
};
