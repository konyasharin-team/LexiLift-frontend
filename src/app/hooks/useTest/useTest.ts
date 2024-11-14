import { useCallback, useEffect, useState } from 'react';
import { IStatistics, ITestItem, ITestSettings } from '@app-types';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { IUseTestReturn } from '@hooks/useTest/types/IUseTestReturn.ts';
import { shuffle } from '@utils';

interface IUseTestOptions {
  onStart?: () => void;
  onFinish?: () => void;
  onRestart?: () => void;
}

export const useTest = (
  dictionary: IDictionaryItem[],
  settings: Pick<ITestSettings, 'isNeedShuffle' | 'wordsCount'>,
  options?: IUseTestOptions,
): IUseTestReturn => {
  const [items, setItems] = useState<ITestItem[]>([]);
  const [statistics, setStatistics] = useState<IStatistics>({
    corrects: 0,
    errors: 0,
  });
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const newItems: ITestItem[] = [];
    let newDictionary: IDictionaryItem[];

    if (settings.isNeedShuffle) newDictionary = shuffle(dictionary);
    else newDictionary = [...dictionary];
    newDictionary = newDictionary.slice(0, settings.wordsCount);

    for (let i = 0; i < newDictionary.length; i++) {
      newItems.push({
        id: i + 1,
        type: 'word',
        value: newDictionary[i].word,
        answerId: newDictionary[i].id,
      });
      newItems.push({
        id: newDictionary.length + i + 1,
        type: 'translation',
        value: newDictionary[i].translation,
        answerId: newDictionary[i].id,
      });
    }
    setItems(newItems);
  }, [dictionary]);

  const setStatisticsHandle = useCallback((newStatistics: IStatistics) => {
    if (newStatistics.corrects >= 0 && newStatistics.errors >= 0)
      setStatistics(newStatistics);
  }, []);

  const start = useCallback(() => {
    setIsStarted(true);
    options?.onStart?.();
  }, []);

  const finish = useCallback(() => {
    setIsStarted(false);
    options?.onFinish?.();
  }, []);

  const restart = useCallback(() => {
    setIsStarted(false);
    options?.onRestart?.();
  }, []);

  return {
    items,
    isStarted,
    start,
    finish,
    restart,
    statistics,
    setStatistics: setStatisticsHandle,
  };
};
