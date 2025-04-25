import { useForm } from '@mantine/form';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';

import { CreateFolderBody } from '../types/CreateFolderBody';

export type EditFolderForm = CreateFolderBody & {
  modules: ModuleSchemaInfer['id'][];
};

export const useEditFolderForm = () => {
  const form = useForm<EditFolderForm>({
    initialValues: {
      title: '',
      description: '',
      modules: [],
    },
  });

  return {
    form,
  };
};
