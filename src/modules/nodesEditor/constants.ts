import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { NodeType } from '@modules/nodesEditor/types/NodeType.ts';

import { branchNode, dialogNode } from './nodes';

export const PINS_PADDING = 8;
export const PIN_SIZE = 10;
export const BASE_NODE_HEIGHT = 50;
export const BASE_NODE_WIDTH = 200;
export const PINS_GAP = 5;
export const TRANSITION_BUTTON_SIZE = 18;

export const PIN_TRANSITION: Omit<IPin, 'id'> = {
  type: 'transition',
  color: {
    outColor: '#dadada',
    innerColor: '#ffffff',
  },
  title: 'Transition',
  description: 'Transition to other node',
  size: TRANSITION_BUTTON_SIZE,
  withManyConnections: true,
};

export const PINS: Omit<IPin, 'id'>[] = [
  PIN_TRANSITION,
  {
    type: 'boolean',
    color: {
      outColor: '#d51e1e',
      innerColor: '#ffffff',
    },
    title: 'Condition',
    description: 'Your condition',
    size: PIN_SIZE,
  },
];

export const NODES: Record<NodeType, INodeInfo<Omit<IPin, 'id'>>> = {
  branch: branchNode,
  dialog: dialogNode,
};
