import { ITestItem } from '@app-types/ITestItem.ts';
import { Answer } from '@components/Board/types/Answer.ts';

export const answerIsContainId = (answer: Answer, id: ITestItem['id']) => {
  return !!answer.find(elem => elem === id);
};
