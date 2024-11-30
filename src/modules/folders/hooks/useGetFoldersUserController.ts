import { useInfiniteQuery } from '@api';
import { FolderSchema } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';
import { z } from 'zod';

export const useGetFoldersUserController = () => {
  const getFoldersUserController = useInfiniteQuery(
    {
      queryKey: ['GET_FOLDERS_USER'],
      queryFn: ({ pageParam }) =>
        FoldersApi.GetFoldersUser({ pageNumber: pageParam, pageSize: 5 }),
    },
    {
      resultSchema: z.array(FolderSchema),
      errorSchema: FoldersErrorSchema,
    },
  );

  return {
    ...getFoldersUserController,
  };
};
