import { useQuery } from '@api';
import { z } from 'zod';

import { TagsApi } from '../api/TagsApi.ts';
import { TagSchemaBackend } from '../types/TagSchema.ts';
import { TagsErrorsSchema } from '../types/TagsErrorsSchema.ts';

export const useGetTagsController = () => {
  const controller = useQuery(
    {
      queryKey: ['GET_TAGS'],
      queryFn: TagsApi.GetTags,
    },
    {
      resultSchema: z.array(TagSchemaBackend),
      errorSchema: TagsErrorsSchema,
    },
  );

  return {
    ...controller,
  };
};
