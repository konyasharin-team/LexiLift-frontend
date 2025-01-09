import { FC } from 'react';
import { useI18N } from '@i18n';
import { Button } from '@mantine/core';
import { EditModuleElementAnimator } from '@modules/vocabularyModule/components/EditModuleElementAnimator';
import { ModuleCard } from '@modules/vocabularyModule/components/ModuleCard/ModuleCard.tsx';
import { useEditModule } from '@modules/vocabularyModule/hooks/useEditModule.ts';
import { AnimatePresence } from 'framer-motion';

export const EditModuleCards: FC<ReturnType<typeof useEditModule>> = props => {
  const { t } = useI18N();

  return (
    <AnimatePresence>
      {props.form.values.words.map((card, index) => (
        <EditModuleElementAnimator key={card.id}>
          <ModuleCard
            index={index}
            id={card.id}
            errors={props.cardsErrors.filter(
              cardError => cardError.id === card.id,
            )}
            card={card}
            onCardChange={props.onCardChange}
            removeCard={props.removeCard}
            disableRemove={props.form.values.words.length <= 3}
          />
        </EditModuleElementAnimator>
      ))}
      <EditModuleElementAnimator>
        <Button
          onClick={props.addCard}
          fullWidth
          variant="outline"
          mt={30}
          h={100}
          className="text"
        >
          {t.createModulePage.addCard}
        </Button>
      </EditModuleElementAnimator>
    </AnimatePresence>
  );
};
