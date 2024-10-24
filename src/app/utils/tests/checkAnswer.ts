import { Answer } from '@components/Board/types/Answer.ts';

import { answersIsEqual } from './answersIsEqual.ts';

export const checkAnswer = (answers: Answer[], answer: Answer) => {
  for (let i = 0; i < answers.length; i++) {
    if (answersIsEqual(answers[i], answer)) {
      return true;
    }
  }
  return false;
};
