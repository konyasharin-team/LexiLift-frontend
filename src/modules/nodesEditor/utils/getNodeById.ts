import { AppNode } from '@modules/nodesEditor/types/AppNode.ts';

export const getNodeById = (nodes: AppNode[], id: AppNode['id']) => {
  return nodes.find(node => node.id === id);
};
