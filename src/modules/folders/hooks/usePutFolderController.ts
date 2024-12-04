import { IdSchemaInfer, useMutation } from '@api';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';

import { PutFolderBody } from '../types/PutFolderBody';

export const usePutFolderController = () => {
  const controller = useMutation(
    {
      mutationFn: (data: PutFolderBody & IdSchemaInfer) =>
        FoldersApi.PutFolder({ ...data }, { id: data.id }),
    },
    { errorSchema: FoldersErrorSchema },
  );
  return {
    ...controller,
  };
};
