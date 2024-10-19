import { useEffect, useState } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { ITestItem } from '@app-types/ITestItem.ts';
import { Answer } from '@components/Board/types/Answer.ts';
import { IUseTestReturn } from '@hooks/useTest/types/IUseTestReturn.ts';

interface IUseTestOptions {
  onStart?: () => void;
  onFinish?: () => void;
  onRestart?: () => void;
}

export const useTest = (
  dictionary: IDictionaryItem[],
  options?: IUseTestOptions,
): IUseTestReturn => {
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
    setItems(newItems);
    setAnswers(newAnswers);
  };

  const start = () => {
    setIsStarted(true);
    options?.onStart?.();
  };

  const finish = () => {
    setIsStarted(false);
    options?.onFinish?.();
  };

  const restart = () => {
    setIsStarted(false);
    options?.onRestart?.();
  };

  return {
    items,
    setItems,
    answers,
    isStarted,
    start,
    finish,
    restart,
  };
};
