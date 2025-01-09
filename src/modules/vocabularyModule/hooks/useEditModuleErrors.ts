import { useState } from 'react';
import { useI18N } from '@i18n';
import { IEditModuleCardError } from '@modules/vocabularyModule/types/IEditModuleCardError.ts';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export const useEditModuleErrors = () => {
  const { t } = useI18N();
  const [cardsErrors, setCardsErrors] = useState<IEditModuleCardError[]>([]);

  const createCardsErrors = (
    cards: ModuleSchemaInfer['words'],
    type: IEditModuleCardError['cardElement'],
    indexes: number[],
  ) => {
    const errors: IEditModuleCardError[] = [];
    if (
      indexes.some(index => index >= cards.length || index < 0) ||
      cards.length === 0
    )
      return errors;
    indexes.forEach(index => {
      errors.push({
        id: cards[index].id,
        cardElement: type,
        message:
          type === 'word'
            ? t.createModulePage.wordAlreadyExistError
            : t.createModulePage.translationAlreadyExistError,
      });
    });
    return errors;
  };

  const validateCards = (cards: ModuleSchemaInfer['words']) => {
    const newCardErrors: IEditModuleCardError[] = [];
    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[i].word === cards[j].word && cards[i].word !== '')
          newCardErrors.push(...createCardsErrors(cards, 'word', [i, j]));
        if (
          cards[i].translation === cards[j].translation &&
          cards[i].translation !== ''
        )
          newCardErrors.push(
            ...createCardsErrors(cards, 'translation', [i, j]),
          );
      }
    }
    setCardsErrors(newCardErrors);
  };

  return {
    validateCards,
    cardsErrors,
  };
};
