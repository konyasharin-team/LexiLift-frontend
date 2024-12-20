import { FC } from 'react';
import { Link } from 'react-router-dom';
import { generators } from '@routes';

export const CoursesPage: FC = () => {
  return (
    <Link to={generators.COURSES_GENERATORS.COURSE(1)}>Тестовый курс</Link>
  );
};
