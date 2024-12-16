import { useEffect, useState } from 'react';
import { DictionaryCardSchemaInfer } from '@app-types';

export const useFlipCards = (cards: DictionaryCardSchemaInfer[]) => {
  const [indexedCards, setIndexedCards] = useState<
    (DictionaryCardSchemaInfer & { index: number })[]
  >([]);
  const [current, setCurrent] = useState<
    (DictionaryCardSchemaInfer & { index: number }) | null
  >(null);

  useEffect(() => {
    setIndexedCards(cards.map((card, index) => ({ ...card, index })));
  }, [cards]);

  useEffect(() => {
    setCurrent(indexedCards.length > 0 ? indexedCards[0] : null);
  }, [indexedCards]);

  const isEnd = !(current && current.index < indexedCards.length - 1);
  const isStart = !(current && current.index > 0);

  const next = () => {
    if (!isEnd && current) setCurrent(indexedCards[current.index + 1]);
  };

  const previous = () => {
    if (!isStart && current) setCurrent(indexedCards[current.index - 1]);
  };

  return {
    current,
    isStart,
    isEnd,
    next,
    previous,
  };
};
