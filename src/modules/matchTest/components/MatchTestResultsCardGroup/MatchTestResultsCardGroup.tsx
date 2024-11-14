import { FC, ReactNode } from 'react';
import { Flex, Text } from '@mantine/core';

interface IMatchTestResultsCardGroupProps {
  icon: ReactNode;
  text: string;
}

export const MatchTestResultsCardGroup: FC<
  IMatchTestResultsCardGroupProps
> = props => {
  return (
    <Flex gap={10} align={'center'}>
      {props.icon}
      <Text fz={28} fw={500}>
        {props.text}
      </Text>
    </Flex>
  );
};
