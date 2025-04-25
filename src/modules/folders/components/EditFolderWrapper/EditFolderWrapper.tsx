import { FC, ReactNode } from 'react';
import { Affix, Button } from '@mantine/core';

import {
  EditFolderForm,
  useEditFolderForm,
} from '../../hooks/useEditFolderForm';

interface IEditFolderWrapperProps
  extends Pick<ReturnType<typeof useEditFolderForm>, 'form'> {
  sendText: string;
  onSubmit: (values: EditFolderForm) => void;
  loading: boolean;
  children?: ReactNode;
}

export const EditFolderWrapper: FC<IEditFolderWrapperProps> = props => {
  return (
    <form onSubmit={props.form.onSubmit(values => props.onSubmit(values))}>
      {props.children}
      <Affix bottom={20} right={20} withinPortal={false}>
        <Button
          type={'submit'}
          radius="md"
          size="xl"
          color="blue"
          loading={props.loading}
          disabled={
            !props.form.values.title.length ||
            !props.form.values.description.length
          }
        >
          {props.sendText}
        </Button>
      </Affix>
    </form>
  );
};
