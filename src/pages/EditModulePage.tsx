import { FC } from 'react';
import { useI18N } from '@i18n';
import { Affix, Button } from '@mantine/core';
import {
  EditModuleCards,
  EditModuleInfo,
  useEditModule,
} from '@modules/vocabularyModule';

export const EditModulePage: FC = () => {
  const { t } = useI18N();
  const editModuleController = useEditModule();

  return (
    <>
      <EditModuleInfo {...editModuleController} />
      <EditModuleCards {...editModuleController} />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          radius="md"
          size="xl"
          color="blue"
          disabled={editModuleController.form.values.cards.some(
            card => card.word.length === 0 || card.translation.length === 0,
          )}
        >
          {t.createModulePage.createModule}
        </Button>
      </Affix>
    </>
  );
};
