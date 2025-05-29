import { ITestSettings } from '@modules/sharedTest';

export type MatchTestSettings = Pick<
  ITestSettings,
  'wordsCount' | 'wordsPerRound' | 'isNeedShuffle'
>;
