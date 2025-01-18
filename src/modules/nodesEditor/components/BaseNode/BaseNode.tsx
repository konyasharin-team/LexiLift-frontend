import { FC } from 'react';
import { Box, Flex, Text } from '@mantine/core';
import { BaseNodeType } from '@modules/nodesEditor/types/BaseNodeType.ts';
import { Handle, NodeProps, Position } from '@xyflow/react';
import clsx from 'clsx';

import styles from './BaseNode.module.css';

export const BaseNode: FC<NodeProps<BaseNodeType>> = props => {
  return (
    <Box className={styles.node}>
      <Text>{props.data.title}</Text>
      <Flex
        justify={'space-evenly'}
        pos={'absolute'}
        direction={'column'}
        top={0}
        left={5}
        h={'100%'}
      >
        {props.data.in.map((_, i) => (
          <Handle
            id={`in-${props.id}-${i}`}
            type={'target'}
            position={Position.Left}
            className={clsx(styles.pin, styles.pinLeft)}
            key={i}
          />
        ))}
      </Flex>
      <Flex
        justify={'space-evenly'}
        pos={'absolute'}
        direction={'column'}
        top={0}
        right={5}
        h={'100%'}
      >
        {props.data.out.map((_, i) => (
          <Handle
            id={`out-${props.id}-${i}`}
            type={'source'}
            position={Position.Right}
            className={clsx(styles.pin, styles.pinRight)}
            key={i}
          />
        ))}
      </Flex>
    </Box>
  );
};
