import { ILesson } from '@modules/cources/types/ILesson.ts';

export interface ICourse {
  name: string;
  description: string;
  tags: string[];
  img: string;
  lessons: ILesson[];
  progress: number;
  index: number;
}
