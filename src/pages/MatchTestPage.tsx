import { FC } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { MatchTestBoard, MatchTestWrapper } from '@modules/matchTest';
import { MatchTestInfoPanel } from '@modules/matchTest';
import { MatchTestTimer } from '@modules/matchTest';
import { useMatchTest } from '@modules/matchTest';
import { toTime } from '@utils/time';

const wordPairs: IDictionaryItem[] = [
  {
    word: 'Apple',
    translation: 'Яблоко',
  },
  {
    word: 'Apple1',
    translation: 'Яблоко1',
  },
  {
    word: 'Apple2',
    translation: 'Яблоко2',
  },
  {
    word: 'Apple3',
    translation: 'Яблоко3',
  },
  {
    word: 'Apple4',
    translation: 'Яблоко4',
  },
  {
    word: 'Apple5',
    translation: 'Яблоко5',
  },
];

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
