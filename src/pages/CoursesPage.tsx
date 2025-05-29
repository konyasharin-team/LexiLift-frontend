import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CourseFilters } from '@modules/cources/components/CourseFilters/CourseFilters.tsx';
import { CourseList } from '@modules/cources/components/CourseList/CourseList.tsx';
import { generators } from '@routes';

export const CoursesPage: FC = () => {
  return (
    <>
      <Link to={generators.COURSES_GENERATORS.COURSE(1)}>Тестовый курс</Link>
      <CourseFilters />
      <CourseList />
    </>
  );
};
