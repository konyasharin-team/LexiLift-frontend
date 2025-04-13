import { FC } from 'react';
import { List } from '@components/List';
import { CourseListElement } from '@modules/cources/components/CourseListElement/CourseListElement.tsx';
import { ICourse } from '@modules/cources/types/ICourse.ts';

import testImg from '/images/test-img.jpg';

export const CourseList: FC = () => {
  const courses: ICourse[] = [
    {
      name: 'Test 1',
      description: 'Description 1',
      img: testImg,
      progress: 70,
      index: 0,
      tags: ['A1', 'A2'],
      lessons: [],
    },
    {
      name: 'Test 2',
      description: 'Абаюдно',
      img: testImg,
      progress: 10,
      index: 1,
      tags: ['C1', 'C2'],
      lessons: [],
    },
    {
      name: 'Test 3',
      description: 'Фимоз',
      img: testImg,
      progress: 90,
      index: 2,
      tags: ['B1'],
      lessons: [],
    },
    {
      name: 'Test 4',
      description: 'Гойда',
      img: testImg,
      progress: 100,
      index: 3,
      tags: ['B2', 'C1', 'C2'],
      lessons: [],
    },
    {
      name: 'Test 5',
      description: 'Бобр курва',
      img: testImg,
      progress: 50,
      index: 4,
      tags: ['A1', 'A2'],
      lessons: [],
    },
    {
      name: 'Test 5',
      description: 'Бобр курва',
      img: testImg,
      progress: 50,
      index: 5,
      tags: ['A1', 'A2'],
      lessons: [],
    },
    {
      name: 'Test 5',
      description: 'Бобр курва',
      img: testImg,
      progress: 50,
      index: 6,
      tags: ['A1', 'A2'],
      lessons: [],
    },
    {
      name: 'Test 5',
      description: 'Бобр курва',
      img: testImg,
      progress: 50,
      index: 7,
      tags: ['A1', 'A2'],
      lessons: [],
    },
  ];

  return (
    <>
      <List height={240} span={3}>
        {courses.map(course => (
          <CourseListElement
            key={course.index}
            name={course.name}
            description={course.description}
            img={course.img}
            progress={course.progress}
            index={course.index}
            tags={course.tags}
          />
        ))}
      </List>
    </>
  );
};
