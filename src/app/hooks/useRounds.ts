import { useEffect, useState } from 'react';
import { IDictionaryItem } from '@app-types';
import { TEST_WORDS_PER_ROUND } from '@constants';

export const useRounds = (
  dictionary: IDictionaryItem[],
  countElementsInRound: number = TEST_WORDS_PER_ROUND,
) => {
  const [currentRoundDictionary, setCurrentRoundDictionary] = useState<
    IDictionaryItem[]
  >([]);
  const [round, setRound] = useState<number>(1);
  const [isLast, setIsLast] = useState<boolean>(false);

  useEffect(() => {
    setCurrentRoundDictionary(
      dictionary.filter(
        (_, i) =>
          i < round * countElementsInRound &&
          i >= (round - 1) * countElementsInRound,
      ),
    );
    if (dictionary.length - round * countElementsInRound <= 0) setIsLast(true);
    else setIsLast(false);
  }, [round, dictionary, countElementsInRound]);

  useEffect(() => {
    setRound(1);
  }, [dictionary]);

  return {
    round,
    setRound,
    currentRoundDictionary,
    isLast,
  };
};
