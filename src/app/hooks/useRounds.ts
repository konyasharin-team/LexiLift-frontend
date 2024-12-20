import { useEffect, useState } from 'react';
import { ITestItem, ITestSettings } from '@app-types';
import { shuffle } from '@utils';

export const useRounds = (
  items: ITestItem[],
  settings: Pick<ITestSettings, 'wordsPerRound' | 'isNeedShuffle'>,
) => {
  const [currentRoundItems, setCurrentRoundItems] = useState<ITestItem[]>([]);
  const [round, setRound] = useState<number>(1);
  const [isLast, setIsLast] = useState<boolean>(false);

  useEffect(() => {
    const newItems = items.filter(
      (_, i) =>
        i < round * settings.wordsPerRound * 2 &&
        i >= (round - 1) * settings.wordsPerRound * 2,
    );
    setCurrentRoundItems(settings.isNeedShuffle ? shuffle(newItems) : newItems);
    if (items.length - round * settings.wordsPerRound <= 0) setIsLast(true);
    else setIsLast(false);
  }, [round, items, settings.wordsPerRound]);

  useEffect(() => {
    setRound(1);
  }, [items]);

  return {
    round,
    setRound,
    currentRoundItems,
    isLast,
  };
};
