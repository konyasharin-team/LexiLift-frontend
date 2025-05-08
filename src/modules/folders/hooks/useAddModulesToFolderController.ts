import { IdSchemaInfer, useMutation } from '@api';
import { FoldersErrorSchema } from '@modules/folders';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';

import { FoldersApi } from '../api/FoldersApi';

export const useAddModulesToFolderController = () => {
  const controller = useMutation(
    {
      mutationFn: (
        params: IdSchemaInfer & { moduleIds: ModuleSchemaInfer['id'][] },
      ) => FoldersApi.PostFolderModules(params),
    },
    {
      errorSchema: FoldersErrorSchema,
    },
  );
  return {
    ...controller,
  };
};
