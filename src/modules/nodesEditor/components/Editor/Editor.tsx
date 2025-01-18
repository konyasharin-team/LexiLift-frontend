import { FC, useContext } from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { HEADER_HEIGHT } from '@modules/layout';
import { EditorContext } from '@modules/nodesEditor';
import { ContextMenu } from '@modules/nodesEditor/components/ContextMenu';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

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
        onContextMenu={context.contextMenu.onContextMenu}
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
