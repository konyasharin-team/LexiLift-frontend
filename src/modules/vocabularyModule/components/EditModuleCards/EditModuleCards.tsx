import { FC } from 'react';
import { useI18N } from '@i18n';
import { Button } from '@mantine/core';
import { ModuleCard } from '@modules/vocabularyModule/components/ModuleCard/ModuleCard.tsx';
import { useEditModule } from '@modules/vocabularyModule/hooks/useEditModule.ts';

export const EditModuleCards: FC<ReturnType<typeof useEditModule>> = props => {
  const { t } = useI18N();

  return (
    <>
      {props.form.values.cards.map((card, index) => (
        <ModuleCard
          key={index}
          id={index}
          card={card}
          onCardChange={props.onCardChange}
          removeCard={props.removeCard}
          disableRemove={props.form.values.cards.length <= 3}
        />
      ))}

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
    </>
  );
};
