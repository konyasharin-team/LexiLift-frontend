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

  const addModule = (id: ModuleSchemaInfer['id']) => {
    form.setValues({ ...form.values, modules: [...form.values.modules, id] });
  };

  const removeModule = (id: ModuleSchemaInfer['id']) => {
    form.setValues({
      ...form.values,
      modules: form.values.modules.filter(otherId => otherId !== id),
    });
  };

  return {
    form,
    addModule,
    removeModule,
  };
};
