import { useCallback, useMemo, useState } from 'react';
import { NODES } from '@modules/nodesEditor';
import { AppEdge } from '@modules/nodesEditor/types/AppEdge.ts';
import { AppNode } from '@modules/nodesEditor/types/AppNode.ts';
import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { generatePinsId } from '@modules/nodesEditor/utils/generatePinsId.ts';
import { getNodeById } from '@modules/nodesEditor/utils/getNodeById.ts';
import { getPinById } from '@modules/nodesEditor/utils/getPinById.ts';
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
    data: generatePinsId('1', NODES.branch),
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    type: 'base',
    data: generatePinsId('2', NODES.dialog),
  },
];
const initialEdges: AppEdge[] = [];

export const useEditor = (options?: IUseEditorOptions) => {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<AppEdge[]>(initialEdges);

  const addNode = (
    node: INodeInfo<Omit<IPin, 'id'>> & Partial<Pick<AppNode, 'position'>>,
  ) => {
    const id: string = `${nodes.length + 1}`;
    setNodes([
      ...nodes,
      {
        ...node,
        id,
        position: node.position ?? { x: 0, y: 0 },
        data: generatePinsId(id, node),
        type: 'base',
      },
    ]);
  };

  const onNodesChange: OnNodesChange<AppNode> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange<AppEdge> = useCallback(
    changes => {
      setEdges(eds => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    connection => {
      const sourceNode = getNodeById(nodes, connection.source);
      const targetNode = getNodeById(nodes, connection.target);
      if (
        sourceNode &&
        targetNode &&
        connection.sourceHandle &&
        connection.targetHandle &&
        getPinById(sourceNode, connection.sourceHandle, 'out')?.type ===
          getPinById(targetNode, connection.targetHandle, 'in')?.type
      ) {
        setEdges(oldEdges =>
          addEdge({ ...connection, type: 'base' }, oldEdges),
        );
      }
    },
    [setEdges, nodes],
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
