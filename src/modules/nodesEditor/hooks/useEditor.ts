import { useCallback, useMemo, useState } from 'react';
import { NODES } from '@modules/nodesEditor';
import { AppNode } from '@modules/nodesEditor/types/AppNode.ts';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';

interface IUseEditorOptions {
  onMouseClosableInteract?: () => void;
}

const initialNodes: AppNode[] = [
  { id: '1', position: { x: 100, y: 0 }, type: 'base', data: NODES.test },
  { id: '2', position: { x: 100, y: 100 }, type: 'base', data: NODES.dialog },
];
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'out-1-0' },
];

export const useEditor = (options?: IUseEditorOptions) => {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const addNode = (node: Omit<AppNode, 'id' | 'position'>) => {
    setNodes([
      ...nodes,
      { id: `${nodes.length}`, position: { x: 0, y: 0 }, ...node },
    ]);
  };

  const onNodesChange: OnNodesChange<AppNode> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const interactEvents = useMemo(
    () => ({
      onMoveStart: () => options?.onMouseClosableInteract?.(),
      onNodeDragStart: () => options?.onMouseClosableInteract?.(),
    }),
    [],
  );

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    addNode,
    interactEvents,
  };
};
