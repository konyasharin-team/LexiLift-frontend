import { DictionaryItemSchemaInfer } from '@app-types';
import { MatchTestSettings } from '@modules/matchTest';
import { createBaseSettings } from '@modules/sharedTest';

export const createMatchTestBaseSettings = (
  module: DictionaryItemSchemaInfer[],
): MatchTestSettings => {
  const sharedTestBaseSettings = createBaseSettings(module);

  return {
    wordsCount: sharedTestBaseSettings.wordsCount,
    isNeedShuffle: sharedTestBaseSettings.isNeedShuffle,
    wordsPerRound: sharedTestBaseSettings.wordsPerRound,
  };
};
