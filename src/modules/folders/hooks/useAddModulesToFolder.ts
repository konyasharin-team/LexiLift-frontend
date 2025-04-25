import { IdSchemaInfer, useMutation } from '@api';
import { FoldersErrorSchema } from '@modules/folders';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';

import { FoldersApi } from '../api/FoldersApi';

interface IUseAddModulesToFolderParams extends Partial<IdSchemaInfer> {
  moduleIds: ModuleSchemaInfer['id'][];
}

export const useAddModulesToFolder = (params: IUseAddModulesToFolderParams) => {
  const controller = useMutation(
    {
      mutationFn: params.id
        ? () =>
            FoldersApi.PostFolderModules({ ...params, id: params.id as number })
        : undefined,
    },
    {
      errorSchema: FoldersErrorSchema,
    },
  );
  return {
    ...controller,
  };
};
