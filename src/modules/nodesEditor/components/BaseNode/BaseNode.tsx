import { FC } from 'react';
import { useElementSize } from '@hooks';
import { Box, Center, Text } from '@mantine/core';
import {
  BASE_NODE_HEIGHT,
  BASE_NODE_WIDTH,
  PINS_PADDING,
} from '@modules/nodesEditor';
import { PinsGroup } from '@modules/nodesEditor/components/PinsGroup';
import { BaseNodeType } from '@modules/nodesEditor/types/BaseNodeType.ts';
import { NodeProps, Position } from '@xyflow/react';

import styles from './BaseNode.module.css';

export const BaseNode: FC<NodeProps<BaseNodeType>> = props => {
  const { ref: leftGroupRef, height: leftGroupHeight } = useElementSize();
  const { ref: rightGroupRef, height: rightGroupHeight } = useElementSize();

  return (
    <Box
      className={styles.node}
      h={Math.max(leftGroupHeight, rightGroupHeight, BASE_NODE_HEIGHT)}
      w={BASE_NODE_WIDTH}
      p={PINS_PADDING}
    >
      <Center h={'100%'}>
        <Text>{props.data.title}</Text>
      </Center>
      <PinsGroup
        ref={leftGroupRef}
        pins={props.data.in}
        position={Position.Left}
      />
      <PinsGroup
        ref={rightGroupRef}
        pins={props.data.out}
        position={Position.Right}
      />
    </Box>
  );
};
