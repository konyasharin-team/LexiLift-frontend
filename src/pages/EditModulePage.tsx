import { FC, useEffect } from 'react';
import { useI18N } from '@i18n';
import { Affix, Button } from '@mantine/core';
import {
  EditModuleCards,
  EditModuleInfo,
  moduleToBackendFieldsTransform,
  useCreateModuleController,
  useEditModule,
} from '@modules/vocabularyModule';
import { motion, Variants } from 'framer-motion';

const wrapperVariants: Variants = {
  off: {},
  on: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

export const EditModulePage: FC = () => {
  const { t } = useI18N();
  const editModuleController = useEditModule();
  const createModuleApiController = useCreateModuleController();

  useEffect(() => {
    if (createModuleApiController.sender.isSuccess)
      editModuleController.form.reset();
  }, [createModuleApiController.sender.isSuccess]);

  return (
    <form
      onSubmit={editModuleController.form.onSubmit(values => {
        if (editModuleController.cardsErrors.length === 0)
          createModuleApiController.sender.mutate({
            ...values,
            ...moduleToBackendFieldsTransform(values),
          });
      })}
    >
      <motion.div
        variants={wrapperVariants}
        initial={'off'}
        animate={'on'}
        style={{ overflow: 'hidden', width: '100%' }}
      >
        <EditModuleInfo {...editModuleController} />
        <EditModuleCards {...editModuleController} />
      </motion.div>
      <Affix position={{ bottom: 20, right: 20 }} withinPortal={false}>
        <Button
          type={'submit'}
          radius="md"
          size="xl"
          color="blue"
          loading={createModuleApiController.sender.isPending}
          disabled={
            editModuleController.form.values.words.some(
              card => card.word.length === 0 || card.translation.length === 0,
            ) ||
            !editModuleController.form.values.title ||
            !editModuleController.form.values.description ||
            editModuleController.cardsErrors.length !== 0
          }
        >
          {t.createModulePage.createModule}
        </Button>
      </Affix>
    </form>
  );
};
