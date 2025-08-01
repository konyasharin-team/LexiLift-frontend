import { IdSchemaInfer, useQuery } from '@api';
import { FolderSchema } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';

export const useGetFolderAboutController = (data?: IdSchemaInfer) => {
  const getFoldersAboutController = useQuery(
    {
      queryKey: ['GET_FOLDERS_ABOUT', data],
      queryFn: data ? () => FoldersApi.GetFolderAbout(data) : undefined,
    },
    {
      resultSchema: FolderSchema,
      errorSchema: FoldersErrorSchema,
    },
  );

  return {
    ...getFoldersAboutController,
  };
};
