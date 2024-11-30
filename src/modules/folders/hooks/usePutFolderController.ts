import { IId, useMutation } from '@api';
import { PutFolderBody } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';

export const usePutFolderController = () => {
  const controller = useMutation(
    {
      mutationFn: (data: PutFolderBody & IId) =>
        FoldersApi.PutFolder({ ...data }, { id: data.id }),
    },
    { errorSchema: FoldersErrorSchema },
  );
  return {
    ...controller,
  };
};
