import { FC } from 'react';
import { GoCheckCircleFill } from 'react-icons/go';
import { IoTimeSharp } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { Flex, Paper, Title, useMantineTheme } from '@mantine/core';
import { IMatchTestResults } from '@modules/matchTest';
import { MatchTestResultsCardGroup } from '@modules/matchTest/components/MatchTestResultsCardGroup/MatchTestResultsCardGroup.tsx';
import { timeToString } from '@utils';
import { motion } from 'framer-motion';

import styles from './MatchTestResultsCard.module.css';

export const MatchTestResultsCard: FC<IMatchTestResults> = props => {
  const theme = useMantineTheme();

  return (
    <Paper shadow={'xl'} p={'lg'} className={styles.card}>
      <motion.div
        initial={{ opacity: 0, translateX: -100 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <Title order={2} fz={32} mb={20}>
          Результаты
        </Title>
        <Flex gap={5} direction={'column'}>
          <MatchTestResultsCardGroup
            text={timeToString(props.time, '%min%min:%s%s') ?? ''}
            icon={<IoTimeSharp size={36} color={theme.colors.blue[5]} />}
          />
          <MatchTestResultsCardGroup
            text={props.statistics.errors.toString()}
            icon={<MdError size={36} color={theme.colors.red[8]} />}
          />
          <MatchTestResultsCardGroup
            text={props.statistics.corrects.toString()}
            icon={<GoCheckCircleFill size={36} color={theme.colors.green[8]} />}
          />
        </Flex>
      </motion.div>

    </Paper>
  );
};
