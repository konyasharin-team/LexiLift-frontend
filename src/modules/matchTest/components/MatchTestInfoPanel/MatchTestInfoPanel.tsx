import { FC, memo, ReactNode } from 'react';
import { Flex } from '@mantine/core';

interface IMatchTestInfoPanelProps {
  children?: ReactNode;
}

export const MatchTestInfoPanel: FC<IMatchTestInfoPanelProps> = memo(props => {
  return (
    <Flex gap={20} mb={20} pl={20} pr={20} pt={20}>
      {props.children}
    </Flex>
  );
});
