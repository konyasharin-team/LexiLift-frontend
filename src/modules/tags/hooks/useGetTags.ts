import { useQuery } from '@api';
import { TagsApi, TagSchema, TagsErrorsSchema } from '@modules/tags';
import { z } from 'zod';

export const useGetTagsController = () => {
  const controller = useQuery(
    {
      queryKey: ['GET_TAGS'],
      queryFn: TagsApi.GetTags.bind(TagsApi),
    },
    {
      resultSchema: z.array(TagSchema.shape.tag),
      errorSchema: TagsErrorsSchema,
    },
  );

  return {
    ...controller,
  };
};
