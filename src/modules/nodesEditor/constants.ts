import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { NodeFormat } from '@modules/nodesEditor/types/NodeFormat.ts';
import { NodeType } from '@modules/nodesEditor/types/NodeType.ts';

export const PINS: Record<NodeFormat, IPin> = {
  base: {
    color: '#dadada',
  },
};

export const NODES: Record<NodeType, INodeInfo> = {
  test: {
    title: 'test',
    in: [PINS.base, PINS.base],
    out: [PINS.base, PINS.base, PINS.base, PINS.base, PINS.base],
  },
  dialog: {
    title: 'dialog',
    in: [PINS.base],
    out: [],
  },
};
