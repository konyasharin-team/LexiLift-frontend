import { z, ZodType } from 'zod';

export const PaginationWithoutContentSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalContent: z.number(),
});

export const PaginationContentSchema = <T extends ZodType = ZodType>(
  contentItemSchema: T,
) =>
  PaginationWithoutContentSchema.merge(
    z.object({
      content: z.array(contentItemSchema),
    }),
  );

export type PaginationWithoutContentSchemaInfer = z.infer<
  typeof PaginationWithoutContentSchema
>;
