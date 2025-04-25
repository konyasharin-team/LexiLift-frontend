import { IdSchemaInfer, useMutation } from '@api';
import { FoldersErrorSchema } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';

export const useRemoveModulesFromFolderController = () => {
  const controller = useMutation(
    {
      mutationFn: (
        params: IdSchemaInfer & { moduleIds: ModuleSchemaInfer['id'][] },
      ) => FoldersApi.DeleteFolderModules(params),
    },
    {
      errorSchema: FoldersErrorSchema,
    },
  );
  return {
    ...controller,
  };
};
