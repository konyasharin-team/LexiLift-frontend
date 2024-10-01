import { useState } from 'react';

import { IDictionaryItem } from '../types/IDictionaryItem.ts';

export const useTest = (
  initialWords: IDictionaryItem[],
  initialTranslations: IDictionaryItem[],
) => {
  const [words, setWords] = useState([...initialWords]);
  const [translations, setTranslations] = useState([...initialTranslations]);
  const [isComplete, setIsComplete] = useState(false);

  return {
    words,
    setWords,
    translations,
    setTranslations,
    isComplete,
    setIsComplete,
  };
};
