import { useCallback, useMemo, useState } from 'react';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';

interface IUseEditorOptions {
  onMouseClosableInteract?: () => void;
}

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const useEditor = (options?: IUseEditorOptions) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const addNode = (node: Omit<Node, 'id' | 'position'>) => {
    setNodes([
      ...nodes,
      { id: `${nodes.length}`, position: { x: 0, y: 0 }, ...node },
    ]);
  };

  const onNodesChange: OnNodesChange = useCallback(
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
