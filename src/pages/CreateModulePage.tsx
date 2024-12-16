import { FC } from 'react';
import { useI18N } from '@i18n';
import { Affix, Button } from '@mantine/core';
import { CreateModule, useCreateModule } from '@modules/vocabularyModule';

export const CreateModulePage: FC = () => {
  const { t } = useI18N();
  const createModuleController = useCreateModule();

  return (
    <>
      <CreateModule {...createModuleController} />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          radius="md"
          size="xl"
          color="blue"
          disabled={createModuleController.cards.some(
            card => card.word.length === 0 || card.translation.length === 0,
          )}
        >
          {t.createModulePage.createModule}
        </Button>
      </Affix>
    </>
  );
};
