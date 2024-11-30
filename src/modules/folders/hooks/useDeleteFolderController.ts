import { useMutation } from '@api';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';

export const useDeleteFolderController = () => {
  const deleteFolderController = useMutation(
    {
      mutationFn: FoldersApi.DeleteFolder.bind(FoldersApi),
    },
    {
      errorSchema: FoldersErrorSchema,
    },
  );

  return {
    ...deleteFolderController,
  };
};
