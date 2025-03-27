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
};

export const PINS: Omit<IPin, 'id'>[] = [
  PIN_TRANSITION,
  {
    type: 'base',
    color: {
      outColor: '#dadada',
      innerColor: '#ffffff',
    },
  },
];

export const NODES: Record<NodeType, INodeInfo<Omit<IPin, 'id'>>> = {
  test: {
    title: 'Test',
    in: [getPin('base')],
    out: [
      getPin('base'),
      getPin('transition'),
      getPin('base'),
      getPin('base'),
      getPin('base'),
      getPin('base'),
      getPin('base'),
      getPin('base'),
    ],
  },
  dialog: {
    title: 'Dialog',
    in: [getPin('base')],
    out: [getPin('base'), getPin('base')],
  },
};
