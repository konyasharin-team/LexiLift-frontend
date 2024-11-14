import { ITestItem } from '@app-types';

export const getAnswers = (items: ITestItem[]) => {
  const answers: [number, number][] = [];
  for (let i = 0; i < items.length; i++) {
    const pair = items.find(
      item => item.answerId === items[i].answerId && item.id !== items[i].id,
    );
    if (pair) answers.push([+items[i].id, +pair.id]);
    else console.error(`Answer not found, item.value = ${items[i].value}`);
  }
  return answers;
};
