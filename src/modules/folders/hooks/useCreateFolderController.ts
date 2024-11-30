import { useMutation } from '@api';
import { FolderSchema } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';

export const useCreateFolderController = () => {
  const createFolderController = useMutation(
    {
      mutationFn: FoldersApi.PostFolder.bind(FoldersApi),
    },
    {
      resultSchema: FolderSchema,
      errorSchema: FoldersErrorSchema,
    },
  );
  return {
    ...createFolderController,
  };
};
