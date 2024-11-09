import { FC, memo } from 'react';
import { Paper, Text } from '@mantine/core';

interface IMatchTestDescriptionProps {
  children?: string;
}

export const MatchTestDescription: FC<IMatchTestDescriptionProps> = memo(
  props => {
    return (
      <Paper h={200} w={'100%'} shadow={'xl'} p={30}>
        <Text className={'title'}>Описание</Text>
        <Text className={'text'}>{props.children}</Text>
      </Paper>
    );
  },
);
