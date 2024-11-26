import { useState } from 'react';
import { IUseModuleCard } from '@modules/vocabularyModule/types/IUseModuleCard.ts';

export const useModuleCard = () => {
  const [cards, setCards] = useState<IUseModuleCard[]>([
    { word: '', translation: '', imageUploaded: false },
    { word: '', translation: '', imageUploaded: false },
    { word: '', translation: '', imageUploaded: false },
  ]);

  const handleCardChange = (
    index: number,
    field: keyof IUseModuleCard,
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
