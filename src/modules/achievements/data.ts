import { AchievementSchemaInfer } from '@modules/achievements/types/AchievementSchema.ts';

import testImg from '/images/test-img.jpg';

export const achievements: AchievementSchemaInfer[] = [
  {
    id: 0,
    name: 'Тестовая ачивка 1',
    icon: testImg,
    description: 'Тестовая ачивка',
  },
  {
    id: 1,
    name: 'Тестовая ачивка 2',
    icon: testImg,
    description: 'Тестовая ачивка',
  },
  {
    id: 2,
    name: 'Тестовая ачивка 3',
    icon: testImg,
    description: 'Тестовая ачивка',
  },
  {
    id: 3,
    name: 'Тестовая ачивка 4',
    icon: testImg,
    description: 'Тестовая ачивка',
  },
];
