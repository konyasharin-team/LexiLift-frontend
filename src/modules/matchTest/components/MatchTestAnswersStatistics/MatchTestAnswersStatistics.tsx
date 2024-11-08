import { FC } from 'react';
import { Flex } from '@mantine/core';
import { useMatchTest } from '@modules/matchTest';
import { MatchTestAnswersStatistic } from '@modules/matchTest/components/MatchTestAnswersStatistic/MatchTestAnswersStatistic.tsx';

export const MatchTestAnswersStatistics: FC<
  Pick<
    ReturnType<typeof useMatchTest>,
    'statistics' | 'successAnimationStyles' | 'errorAnimationStyles'
  >
> = props => {
  return (
    <Flex direction={'column'} w={500} gap={15} justify={'space-between'}>
      <MatchTestAnswersStatistic bg={'red'} style={props.errorAnimationStyles}>
        {props.statistics.errors}
      </MatchTestAnswersStatistic>
      <MatchTestAnswersStatistic
        bg={'green'}
        style={props.successAnimationStyles}
      >
        {props.statistics.corrects}
      </MatchTestAnswersStatistic>
    </Flex>
  );
};
