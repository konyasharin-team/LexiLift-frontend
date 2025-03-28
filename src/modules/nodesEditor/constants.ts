import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { NodeType } from '@modules/nodesEditor/types/NodeType.ts';
import { getPin } from '@modules/nodesEditor/utils/getPin.ts';

export const PINS_PADDING = 8;
export const PIN_SIZE = 10;
export const BASE_NODE_HEIGHT = 50;
export const BASE_NODE_WIDTH = 150;
export const PINS_GAP = 5;
export const TRANSITION_BUTTON_SIZE = 18;

export const PIN_TRANSITION: Omit<IPin, 'id'> = {
  type: 'transition',
  color: {
    outColor: '#dadada',
    innerColor: '#ffffff',
  },
  size: TRANSITION_BUTTON_SIZE,
};

export const PINS: Omit<IPin, 'id'>[] = [
  PIN_TRANSITION,
  {
    type: 'boolean',
    color: {
      outColor: '#d51e1e',
      innerColor: '#ffffff',
    },
    size: PIN_SIZE,
  },
];

export const NODES: Record<NodeType, INodeInfo<Omit<IPin, 'id'>>> = {
  branch: {
    title: 'Branch',
    in: [getPin('transition'), getPin('boolean')],
    out: [getPin('transition'), getPin('transition')],
    color: '#9f9a9a',
  },
  dialog: {
    title: 'Dialog',
    in: [getPin('transition'), getPin('boolean'), getPin('boolean')],
    out: [
      getPin('transition'),
      getPin('boolean'),
      getPin('boolean'),
      getPin('boolean'),
    ],
    color: '#6381e0',
  },
};
