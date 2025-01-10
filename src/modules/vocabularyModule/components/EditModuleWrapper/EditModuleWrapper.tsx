import { FC, ReactNode } from 'react';
import { Affix, Button } from '@mantine/core';
import { Form, useEditModule } from '@modules/vocabularyModule';
import { motion, Variants } from 'framer-motion';

interface IEditModuleWrapperProps
  extends Pick<ReturnType<typeof useEditModule>, 'form' | 'cardsErrors'> {
  loading: boolean;
  sendText: string;
  onSubmit: (values: Form) => void;
  children?: ReactNode;
}

const wrapperVariants: Variants = {
  off: {},
  on: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

export const EditModuleWrapper: FC<IEditModuleWrapperProps> = props => {
  return (
    <form
      onSubmit={props.form.onSubmit(values => {
        if (props.cardsErrors.length === 0) props.onSubmit(values);
      })}
    >
      <motion.div
        variants={wrapperVariants}
        initial={'off'}
        animate={'on'}
        style={{ overflow: 'hidden', width: '100%' }}
      >
        {props.children}
      </motion.div>
      <Affix position={{ bottom: 20, right: 20 }} withinPortal={false}>
        <Button
          type={'submit'}
          radius="md"
          size="xl"
          color="blue"
          loading={props.loading}
          disabled={
            props.form.values.words.some(
              card => card.word.length === 0 || card.translation.length === 0,
            ) ||
            !props.form.values.title ||
            !props.form.values.description ||
            props.cardsErrors.length !== 0
          }
        >
          {props.sendText}
        </Button>
      </Affix>
    </form>
  );
};
