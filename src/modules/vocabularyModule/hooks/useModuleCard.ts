import { useState } from 'react';
import { ModuleCard } from '@modules/vocabularyModule/types/ModuleCard.ts';

export const useModuleCard = () => {
  const [cards, setCards] = useState<ModuleCard[]>([
    { word: '', translation: '' },
    { word: '', translation: '' },
    { word: '', translation: '' },
  ]);

  const handleCardChange = (
    index: number,
    field: keyof ModuleCard,
    value: string,
  ) => {
    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, [field]: value } : card,
      ),
    );
  };

  const handleImageUpload = (index: number, imageUrl: string) => {
    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, imageUploaded: true, img: imageUrl } : card,
      ),
    );
  };

  const handleDeleteImage = (index: number) => {
    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, imageUploaded: false, img: undefined } : card,
      ),
    );
  };

  return {
    cards,
    setCards,
    handleCardChange,
    handleImageUpload,
    handleDeleteImage,
  };
};
