import { PaginationContentSchema, useInfiniteQuery } from '@api';

import { FoldersApi } from '../api/FoldersApi';
import { FolderSchema } from '../types/FolderSchema';
import { FoldersErrorSchema } from '../types/FoldersErrorSchema';

export const useGetFoldersUserController = () => {
  const getFoldersUserController = useInfiniteQuery(
    {
      queryKey: ['GET_FOLDERS_USER'],
      queryFn: ({ pageParam }) =>
        FoldersApi.GetFoldersUser({ pageNumber: pageParam, pageSize: 5 }),
    },
    {
      resultSchema: PaginationContentSchema(FolderSchema),
      errorSchema: FoldersErrorSchema,
    },
  );

  return {
    ...getFoldersUserController,
  };
};
