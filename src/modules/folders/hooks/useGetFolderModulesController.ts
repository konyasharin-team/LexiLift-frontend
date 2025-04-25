import { IdSchemaInfer, useQuery } from '@api';
import { FoldersErrorSchema } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi';
import { ModuleSchema } from '@modules/vocabularyModule';
import { z } from 'zod';

export const useGetFolderModulesController = (data?: IdSchemaInfer) => {
  const controller = useQuery(
    {
      queryKey: ['GET_FOLDER_MODULES', data],
      queryFn: data ? () => FoldersApi.GetFolderModules(data) : undefined,
    },
    {
      resultSchema: z.array(ModuleSchema),
      errorSchema: FoldersErrorSchema,
    },
  );

  return {
    ...controller,
  };
};
