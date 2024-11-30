import { FC } from 'react';
import { List } from '@components/List';
import { CourseLessonsListElement } from '@modules/cources/components/CourseLessonsListElement/CourseLessonsListElement.tsx';
import { ICourse } from '@modules/cources/types/ICourse.ts';

export const CourseLessonsList: FC<
  Pick<ICourse, 'lessons' | 'progress'>
> = props => {
  return (
    <List>
      {props.lessons.map((lesson, i) => (
        <CourseLessonsListElement
          {...lesson}
          progress={props.progress}
          index={i}
          key={i}
        />
      ))}
    </List>
  );
};
