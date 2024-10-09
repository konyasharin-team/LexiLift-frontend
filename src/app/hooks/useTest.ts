import { useEffect, useState } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { ITestItem } from '@app-types/ITestItem.ts';
import { Answer } from '@components/Board/types/Answer.ts';

export const useTest = (dictionary: IDictionaryItem[]) => {
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

  return {
    items,
    setItems,
    answers,
  };
};
