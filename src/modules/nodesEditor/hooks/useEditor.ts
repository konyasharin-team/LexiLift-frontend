import { useCallback, useMemo, useState } from 'react';
import { NODES } from '@modules/nodesEditor';
import { AppEdge } from '@modules/nodesEditor/types/AppEdge.ts';
import { AppNode } from '@modules/nodesEditor/types/AppNode.ts';
import { generatePinsId } from '@modules/nodesEditor/utils/generatePinsId.ts';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';

interface IUseEditorOptions {
  onMouseClosableInteract?: () => void;
}

const initialNodes: AppNode[] = [
  {
    id: '1',
    position: { x: 100, y: 0 },
    type: 'base',
    data: generatePinsId('1', NODES.test),
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    type: 'base',
    data: generatePinsId('2', NODES.dialog),
  },
];
const initialEdges: AppEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'out-1-0',
    type: 'base',
  },
];

export const useEditor = (options?: IUseEditorOptions) => {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<AppEdge[]>(initialEdges);

  const addNode = (
    node: Omit<AppNode, 'id' | 'position'> & Partial<Pick<AppNode, 'position'>>,
  ) => {
    setNodes([
      ...nodes,
      {
        ...node,
        id: `${nodes.length}`,
        position: node.position ?? { x: 0, y: 0 },
      },
    ]);
  };

  const onNodesChange: OnNodesChange<AppNode> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange<AppEdge> = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    connection => {
      setEdges(oldEdges => addEdge({ ...connection, type: 'base' }, oldEdges));
    },
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
    onConnect,
    edges,
    setEdges,
    onEdgesChange,
    addNode,
    interactEvents,
  };
};
