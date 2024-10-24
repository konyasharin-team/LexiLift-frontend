import { useEffect, useState } from 'react';

import { IDictionaryItem } from '../types/IDictionaryItem.ts';

export const useRounds = (
  dictionary: IDictionaryItem[],
  countElementsInRound: number = 5,
) => {
  const [currentRoundDictionary, setCurrentRoundDictionary] = useState<
    IDictionaryItem[]
  >([]);
  const [round, setRound] = useState<number>(1);

  useEffect(() => {
    setCurrentRoundDictionary(
      dictionary.filter(
        (_, i) =>
          (round - 1) * countElementsInRound + i < round * countElementsInRound,
      ),
    );
  }, [round, dictionary, countElementsInRound]);

  useEffect(() => {
    setRound(1);
  }, [dictionary]);

  return {
    round,
    setRound,
    currentRoundDictionary,
  };
};
