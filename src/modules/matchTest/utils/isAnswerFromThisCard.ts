import { ITestItem } from '@app-types';
import { Answer } from '@components/Board/types/Answer.ts';

export const isAnswerFromThisCard = (
  answer: Answer,
  cardId: ITestItem['id'],
) => {
  return answer.find(id => id === cardId);
};
