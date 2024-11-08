import { FC } from 'react';
import {
  MatchTestAnswersStatistics,
  MatchTestBoard,
  MatchTestDescription,
  MatchTestInfoPanel,
  MatchTestTimer,
  MatchTestWrapper,
  useMatchTest,
} from '@modules/matchTest';
import { wordPairs } from '@modules/matchTest/data.ts';
import { toTime } from '@utils';

export const MatchTestPage: FC = () => {
  const matchTest = useMatchTest(wordPairs);

  return (
    <MatchTestWrapper
      blurIsActive={matchTest.isStarted}
      start={matchTest.start}
    >
      <MatchTestInfoPanel>
        <MatchTestTimer time={toTime({ seconds: matchTest.time })} />
        <MatchTestDescription>
          Перетаскивайте слова на правильные переводы и наоборот
        </MatchTestDescription>
        <MatchTestAnswersStatistics {...matchTest} />
      </MatchTestInfoPanel>
      <MatchTestBoard test={matchTest} />
    </MatchTestWrapper>
  );
};
