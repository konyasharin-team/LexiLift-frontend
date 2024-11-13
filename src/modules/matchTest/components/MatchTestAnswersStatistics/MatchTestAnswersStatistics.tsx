import { FC, memo } from 'react';
import { Flex } from '@mantine/core';
import { useMatchTest } from '@modules/matchTest';
import { MatchTestAnswersStatistic } from '@modules/matchTest/components/MatchTestAnswersStatistic/MatchTestAnswersStatistic.tsx';

export const MatchTestAnswersStatistics: FC<
  Pick<
    ReturnType<typeof useMatchTest>,
    'statistics' | 'successAnimationScope' | 'errorAnimationScope'
  >
> = memo(props => {
  return (
    <Flex direction={'column'} w={500} gap={15} justify={'space-between'}>
      <MatchTestAnswersStatistic bg={'red'} scope={props.errorAnimationScope}>
        {props.statistics.errors}
      </MatchTestAnswersStatistic>
      <MatchTestAnswersStatistic
        bg={'green'}
        scope={props.successAnimationScope}
      >
        {props.statistics.corrects}
      </MatchTestAnswersStatistic>
    </Flex>
  );
});
