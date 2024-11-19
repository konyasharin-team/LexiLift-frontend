import { FC } from 'react';
import testImg from '@assets/images/test-img.jpg';
import { CourseLessonsList } from '@modules/cources';

export const CoursePage: FC = () => {
  return (
    <CourseLessonsList
      progress={3}
      lessons={[
        {
          name: 'Тестовый урок 1',
          description: 'Описание тестового урока 1',
          img: testImg,
        },
        {
          name: 'Тестовый урок 1',
          description: 'Описание тестового урока 1',
          img: testImg,
        },
        {
          name: 'Тестовый урок 1 Тестовый урок 1 Тестовый урок 1',
          description: 'Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1 Описание тестового урока 1',
          img: testImg,
        },
        {
          name: 'Тестовый урок 1',
          description: 'Описание тестового урока 1',
          img: testImg,
        },
        {
          name: 'Тестовый урок 1',
          description: 'Описание тестового урока 1',
          img: testImg,
        },
        {
          name: 'Тестовый урок 1',
          description: 'Описание тестового урока 1',
          img: testImg,
        },
        {
          name: 'Тестовый урок 1',
          description: 'Описание тестового урока 1',
          img: testImg,
        },
      ]}
    />
  );
};
