import { IDictionaryItem, ITestSettings } from '@app-types';
import { TEST_WORDS_PER_ROUND } from '@constants';

export const createBaseSettings = (
  module: IDictionaryItem[],
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
