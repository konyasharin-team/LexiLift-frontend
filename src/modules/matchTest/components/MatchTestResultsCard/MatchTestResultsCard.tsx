import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoTimeSharp } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { Flex, Paper, Text, useMantineTheme } from '@mantine/core';
import { IMatchTestResults } from '@modules/matchTest';
import { timeToString } from '@utils';

export const MatchTestResultsCard: FC<IMatchTestResults> = props => {
  const theme = useMantineTheme();

  return (
    <Paper shadow={'xl'} p={'md'}>
      <Flex gap={5} direction={'column'}>
        <Flex gap={10} align={'center'}>
          <IoTimeSharp size={36} color={theme.colors.blue[5]} />
          <Text fz={28} fw={500}>
            {timeToString(props.time, '%min%min:%s%s')}
          </Text>
        </Flex>
        <Flex align={'center'} gap={10}>
          <MdError size={36} color={theme.colors.red[8]} />
          <Text fz={28} fw={500}>
            {props.statistics.errors}
          </Text>
        </Flex>
        <Flex align={'center'} gap={10}>
          <FaCheckCircle size={36} color={theme.colors.green[8]} />
          <Text fz={28} fw={500}>
            {props.statistics.corrects}
          </Text>
        </Flex>
      </Flex>
    </Paper>
  );
};
