import { FC, ReactNode } from 'react';
import { Flex } from '@mantine/core';

interface IMatchTestInfoPanelProps {
  children?: ReactNode;
}

export const MatchTestInfoPanel: FC<IMatchTestInfoPanelProps> = props => {
  return (
    <Flex gap={20} mb={20}>
      {props.children}
    </Flex>
  );
};
