import { FC } from 'react';
import { ITime } from '@app-types/ITime.ts';
import { Flex, Paper, Text } from '@mantine/core';
import { timeToString } from '@utils/time';

interface IMatchTestTimerProps {
  time: ITime;
}

export const MatchTestTimer: FC<IMatchTestTimerProps> = props => {
  return (
    <Paper h={200} w={250} shadow={'xl'}>
      <Flex align={'center'} justify={'center'} h={'100%'} w={'100%'}>
        <Text fw={500} fz={48}>
          {timeToString(props.time, '%min%min:%s%s')}
        </Text>
      </Flex>
    </Paper>
  );
};
