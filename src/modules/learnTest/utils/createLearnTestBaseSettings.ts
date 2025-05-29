import { DictionaryItemSchemaInfer } from '@app-types';
import { LearnTestSettings } from '@modules/learnTest';
import { createBaseSettings } from '@modules/sharedTest';

export const createLearnTestBaseSettings = (
  module: DictionaryItemSchemaInfer[],
): LearnTestSettings => {
  const sharedTestBaseSettings = createBaseSettings(module);

  return {
    wordsCount: sharedTestBaseSettings.wordsCount,
  };
};
