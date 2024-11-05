import { Answer } from '@components/Board/types/Answer.ts';

export const answersIsEqual = (answer1: Answer, answer2: Answer) => {
  return (
    (answer1[0] === answer2[0] && answer1[1] === answer2[1]) ||
    (answer1[0] === answer2[1] && answer1[1] === answer2[0])
  );
};
