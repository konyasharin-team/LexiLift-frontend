import { FC } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';

export const ContextMenuItem: FC<Pick<INodeInfo, 'title'>> = props => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();

  return (
    <Box
      ref={ref}
      p={6}
      bg={hovered ? theme.colors.blue[3] : theme.white}
      style={{ borderRadius: theme.radius.sm, cursor: 'pointer' }}
    >
      <Text fz={14}>{props.title}</Text>
    </Box>
  );
};
