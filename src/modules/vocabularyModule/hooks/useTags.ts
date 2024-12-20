import { useEffect, useState } from 'react';

export interface ITag {
  label: string;
  color: string;
}

export interface ISelectedTag extends ITag {
  selected?: boolean;
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const useTags = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [initialTags, setInitialTags] = useState<ITag[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTags([
      { label: 'Пример', color: getRandomColor() },
      { label: 'Тег1', color: getRandomColor() },
      { label: 'Тег2', color: getRandomColor() },
    ]);
  }, []);

  useEffect(() => {
    setInitialTags([
      { label: 'Черепаха', color: getRandomColor() },
      { label: 'Цель', color: getRandomColor() },
      { label: 'Пушка', color: getRandomColor() },
    ]);
  }, []);

  const handleAddTag = (tag: string) => {
    if (tag && !tags.some(t => t.label === tag)) {
      setTags([...tags, { label: tag, color: getRandomColor() }]);
    }
  };

  const handleRemoveTag = (tagToRemove: ITag) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredOptions: ISelectedTag[] = initialTags
    .filter(item =>
      item.label.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .map(item => ({
      label: item.label,
      color: item.color,
      selected: tags.some(tag => tag.label === item.label),
    }));

  return {
    tags,
    setTags,
    search,
    filteredOptions,
    setSearch,
    handleAddTag,
    handleRemoveTag,
    getRandomColor,
  };
};
