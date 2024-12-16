import { useState } from 'react';
import { IDictionaryCard } from '@app-types';

export const useCreateModule = () => {
  const [cards, setCards] = useState<IDictionaryCard[]>([
    { id: 0, word: '', translation: '' },
    { id: 1, word: '', translation: '' },
    { id: 2, word: '', translation: '' },
  ]);

  const onCardChange = <T extends keyof Omit<IDictionaryCard, 'id'>>(
    id: IDictionaryCard['id'],
    field: T,
    value: IDictionaryCard[T],
  ) => {
    setCards(
      cards.map(card => {
        if (card.id === id) return { ...card, [field]: value };
        return card;
      }),
    );
  };

  const addCard = () => {
    setCards([...cards, { id: cards.length - 1, word: '', translation: '' }]);
  };

  const removeCard = (id: IDictionaryCard['id']) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return {
    cards,
    onCardChange,
    addCard,
    removeCard,
  };
};
