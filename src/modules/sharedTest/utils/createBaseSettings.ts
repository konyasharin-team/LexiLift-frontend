import { DictionaryItemSchemaInfer } from '@app-types';
import { TEST_WORDS_PER_ROUND } from '@constants';
import { ITestSettings } from '@modules/sharedTest';

export const createBaseSettings = (
  module: DictionaryItemSchemaInfer[],
): ITestSettings => {
  return {
    wordsCount: module.length,
    wordsPerRound:
      module.length > TEST_WORDS_PER_ROUND
        ? TEST_WORDS_PER_ROUND
        : module.length,
    isNeedShuffle: true,
  };
};
