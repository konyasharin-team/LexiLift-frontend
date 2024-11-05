export interface Module {
  title: string;
  description: string;
  tags: string[];
}

export const modulesData: Module[] = [
  {
    title: 'Фрукты',
    description: 'Изучение фруктов на английском',
    tags: ['Изучение', 'Основы', 'Слова'],
  },
  {
    title: 'Предметы быта',
    description: 'Изучение предметов, которые мы видим каждый день',
    tags: ['Перевод', 'Носки', 'Стиралка'],
  },
  {
    title: 'Одежда',
    description: 'Изучение одежды',
    tags: ['Слова', 'Легко', 'Актуально'],
  },
];
