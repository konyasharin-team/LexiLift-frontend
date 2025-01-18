import { FC, useContext } from 'react';
import { Box } from '@mantine/core';
import { HEADER_HEIGHT } from '@modules/layout';
import { EditorContext } from '@modules/nodesEditor';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export const Editor: FC = () => {
  const editor = useContext(EditorContext);

  return (
    <Box w={'100%'} h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <ReactFlow
        nodes={editor?.nodes}
        edges={editor?.edges}
        onNodesChange={editor?.onNodesChange}
        onEdgesChange={editor?.onEdgesChange}
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
    </Box>
  );
};
