import { IDictionaryItem } from '../../../app/types/IDictionaryItem.ts';

export const isMatched = (
  matchedItems: IDictionaryItem[],
  word: string,
  translation: string,
) =>
  matchedItems.some(
    item => item.word === word || item.translation === translation,
  );
