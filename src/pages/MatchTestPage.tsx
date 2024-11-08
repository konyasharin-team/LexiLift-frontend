import { FC } from 'react';
import {
  MatchTestBoard,
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
      </MatchTestInfoPanel>
      <MatchTestBoard test={matchTest} />
    </MatchTestWrapper>
  );
};
