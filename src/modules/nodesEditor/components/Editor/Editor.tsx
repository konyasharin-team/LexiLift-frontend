import { FC, useContext } from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { HEADER_HEIGHT } from '@modules/layout';
import { EditorContext } from '@modules/nodesEditor';
import { BaseConnectionLine } from '@modules/nodesEditor/components/BaseConnectionLine';
import { BaseEdge } from '@modules/nodesEditor/components/BaseEdge';
import { BaseNode } from '@modules/nodesEditor/components/BaseNode';
import { ContextMenu } from '@modules/nodesEditor/components/ContextMenu';
import {
  Background,
  BackgroundVariant,
  ConnectionLineComponent,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  base: BaseNode,
};

const edgeTypes = {
  base: BaseEdge,
};

export const Editor: FC = () => {
  const theme = useMantineTheme();
  const context = useContext(EditorContext);

  if (!context) return undefined;
  return (
    <Box
      w={'100%'}
      h={`calc(100vh - ${HEADER_HEIGHT}px - ${theme.spacing.xl})`}
      ref={context.contextMenu.inContainer.containerRef}
    >
      <ReactFlow
        nodes={context.editor.nodes}
        edges={context.editor.edges}
        onNodesChange={context.editor.onNodesChange}
        onEdgesChange={context.editor.onEdgesChange}
        onConnect={context.editor.onConnect}
        onContextMenu={context.contextMenu.onContextMenu}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={BaseConnectionLine as ConnectionLineComponent}
        {...context.editor.interactEvents}
      >
        <Controls />
        <MiniMap />
        <Background
          variant={BackgroundVariant.Lines}
          gap={25}
          size={1}
          lineWidth={2}
        />
      </ReactFlow>
      <ContextMenu />
    </Box>
  );
};
