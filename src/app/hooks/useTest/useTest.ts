import { useCallback, useEffect, useState } from 'react';
import { IStatistics } from '@app-types';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { ITestItem } from '@app-types/ITestItem.ts';
import { Answer } from '@components/Board/types/Answer.ts';
import { IUseTestReturn } from '@hooks/useTest/types/IUseTestReturn.ts';
import { shuffle } from '@utils';

interface IUseTestOptions {
  onStart?: () => void;
  onFinish?: () => void;
  onRestart?: () => void;
  isNeedShuffle?: boolean;
}

export const useTest = (
  dictionary: IDictionaryItem[],
  options?: IUseTestOptions,
): IUseTestReturn => {
  const [statistics, setStatistics] = useState<IStatistics>({
    corrects: 0,
    errors: 0,
  });
  const [isStarted, setIsStarted] = useState(false);
  const [items, setItems] = useState<ITestItem[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    init();
  }, [dictionary]);

  const init = () => {
    const newItems: ITestItem[] = [];
    const newAnswers: [number, number][] = [];
    for (let i = 0; i < dictionary.length; i++) {
      newItems.push({
        id: i + 1,
        type: 'word',
        value: dictionary[i].word,
      });
      newItems.push({
        id: dictionary.length + i + 1,
        type: 'translation',
        value: dictionary[i].translation,
      });
      newAnswers.push([i + 1, dictionary.length + i + 1]);
    }
    if (options?.isNeedShuffle) setItems(shuffle(newItems));
    else setItems(newItems);
    setAnswers(newAnswers);
  };

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
    setItems,
    answers,
    isStarted,
    start,
    finish,
    restart,
    statistics,
    setStatistics: setStatisticsHandle,
  };
};
