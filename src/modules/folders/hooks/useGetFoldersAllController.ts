import { useInfiniteQuery } from '@api';
import { FolderSchema } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';
import { z } from 'zod';

export const useGetFoldersAllController = () => {
  const getFoldersAllController = useInfiniteQuery(
    {
      queryKey: ['GET_FOLDERS_ALL'],
      queryFn: ({ pageParam }) =>
        FoldersApi.GetFoldersAll({ pageNumber: pageParam, pageSize: 5 }),
    },
    {
      resultSchema: z.array(FolderSchema),
      errorSchema: FoldersErrorSchema,
    },
  );

  return {
    ...getFoldersAllController,
  };
};
