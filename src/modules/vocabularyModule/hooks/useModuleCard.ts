import { useState } from 'react';

interface ICard {
  word: string;
  translation: string;
  imageUploaded: boolean;
  imageUrl?: string;
}

export const useModuleCard = () => {
  const [cards, setCards] = useState<ICard[]>([
    { word: '', translation: '', imageUploaded: false },
    { word: '', translation: '', imageUploaded: false },
    { word: '', translation: '', imageUploaded: false },
  ]);

  const handleCardChange = (
    index: number,
    field: keyof ICard,
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
        i === index ? { ...card, imageUploaded: true, imageUrl } : card,
      ),
    );
  };

  const handleDeleteImage = (index: number) => {
    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index
          ? { ...card, imageUploaded: false, imageUrl: undefined }
          : card,
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
