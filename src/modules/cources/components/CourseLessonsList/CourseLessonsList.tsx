import { FC } from 'react';
import { Grid } from '@mantine/core';
import { CourseLessonsListElement } from '@modules/cources/components/CourseLessonsListElement/CourseLessonsListElement.tsx';
import { ILesson } from '@modules/cources/types/ILesson.ts';

interface ICourseLessonsListProps {
  lessons: ILesson[];
}

export const CourseLessonsList: FC<ICourseLessonsListProps> = props => {
  return (
    <Grid gutter={'md'}>
      {props.lessons.map((lesson, i) => (
        <CourseLessonsListElement {...lesson} key={i} />
      ))}
    </Grid>
  );
};
