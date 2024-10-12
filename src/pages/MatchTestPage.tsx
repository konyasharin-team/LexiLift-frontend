import { FC } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { useMatchTest } from '@modules/MatchTest/hooks/useMatchTest.ts';
import { MatchTest } from '@modules/MatchTest/MatchTest.tsx';

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

  return <MatchTest {...matchTest} />;
};
