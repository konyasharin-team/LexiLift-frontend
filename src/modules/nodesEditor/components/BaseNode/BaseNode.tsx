import { FC } from 'react';
import { useElementSize } from '@hooks';
import {
  alpha,
  Box,
  Center,
  Flex,
  getGradient,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  BASE_NODE_HEIGHT,
  BASE_NODE_WIDTH,
  PINS_PADDING,
} from '@modules/nodesEditor';
import { PinsGroup } from '@modules/nodesEditor/components/PinsGroup';
import { BaseNodeType } from '@modules/nodesEditor/types/BaseNodeType.ts';
import { getIsHaveTransition } from '@modules/nodesEditor/utils/getIsHaveTransition.ts';
import { NodeProps, Position } from '@xyflow/react';

export const BaseNode: FC<NodeProps<BaseNodeType>> = props => {
  const theme = useMantineTheme();
  const { ref: leftGroupRef, height: leftGroupHeight } = useElementSize();
  const { ref: rightGroupRef, height: rightGroupHeight } = useElementSize();
  const isHasTransition =
    getIsHaveTransition(props.data.in) || getIsHaveTransition(props.data.out);

  return (
    <Flex direction={'column'}>
      {isHasTransition ? (
        <Box
          w={BASE_NODE_WIDTH}
          h={40}
          pl={'sm'}
          style={{
            borderTopLeftRadius: theme.radius.sm,
            borderTopRightRadius: theme.radius.sm,
          }}
          bg={getGradient({ deg: 0, from: 'blue.3', to: 'blue.4' }, theme)}
        >
          <Flex direction={'column'} justify={'center'} h={'100%'}>
            <Text>{props.data.title}</Text>
          </Flex>
        </Box>
      ) : undefined}
      <Box
        h={Math.max(leftGroupHeight, rightGroupHeight, BASE_NODE_HEIGHT)}
        w={BASE_NODE_WIDTH}
        p={PINS_PADDING}
        pos={'relative'}
        bg={alpha(theme.colors.blue[5], isHasTransition ? 0.5 : 0.3)}
        style={
          isHasTransition
            ? {
                borderBottomLeftRadius: theme.radius.sm,
                borderBottomRightRadius: theme.radius.sm,
              }
            : {
                borderRadius: theme.radius.sm,
              }
        }
      >
        {!isHasTransition ? (
          <Center h={'100%'}>
            <Text>{props.data.title}</Text>
          </Center>
        ) : undefined}
        <PinsGroup
          ref={leftGroupRef}
          pins={props.data.in}
          position={Position.Left}
          withStartPadding={props.data.out.some(
            pin => pin.type === 'transition',
          )}
        />
        <PinsGroup
          ref={rightGroupRef}
          pins={props.data.out}
          position={Position.Right}
        />
      </Box>
    </Flex>
  );
};
