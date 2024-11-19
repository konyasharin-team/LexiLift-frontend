import { FC } from 'react';
import { Grid } from '@mantine/core';
import { CourseLessonsListElement } from '@modules/cources/components/CourseLessonsListElement/CourseLessonsListElement.tsx';
import { ICourse } from '@modules/cources/types/ICourse.ts';

export const CourseLessonsList: FC<
  Pick<ICourse, 'lessons' | 'progress'>
> = props => {
  return (
    <Grid gutter={'md'}>
      {props.lessons.map((lesson, i) => (
        <CourseLessonsListElement
          {...lesson}
          progress={props.progress}
          index={i}
          key={i}
        />
      ))}
    </Grid>
  );
};
