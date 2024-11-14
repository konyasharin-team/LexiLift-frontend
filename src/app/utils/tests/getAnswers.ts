import { IDictionaryItem } from '@app-types';

export const getAnswers = (dictionary: IDictionaryItem[]) => {
  const answers: [number, number][] = [];
  for (let i = 0; i < dictionary.length; i++) {
    answers.push([i + 1, dictionary.length + i + 1]);
  }
  return answers;
};
