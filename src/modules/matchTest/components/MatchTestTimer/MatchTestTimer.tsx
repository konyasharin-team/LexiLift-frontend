import { FC } from 'react';
import { ITime } from '@app-types';
import { Flex, Paper, Text } from '@mantine/core';
import { timeToString } from '@utils';

interface IMatchTestTimerProps {
  time: ITime;
}

export const MatchTestTimer: FC<IMatchTestTimerProps> = props => {
  return (
    <Paper h={200} w={350} shadow={'xl'}>
      <Flex align={'center'} justify={'center'} h={'100%'} w={'100%'}>
        <Text className={'title'}>
          {timeToString(props.time, '%min%min:%s%s')}
        </Text>
      </Flex>
    </Paper>
  );
};
