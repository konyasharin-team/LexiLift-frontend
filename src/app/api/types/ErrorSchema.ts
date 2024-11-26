import { z, ZodLiteral, ZodObject, ZodString, ZodTypeAny, ZodUnion } from 'zod';

export const ErrorSchema = <
  P extends
    | ZodString
    | ZodUnion<[ZodLiteral<string>, ...ZodLiteral<string>[]]> = ZodString,
  K extends ZodObject<Record<string, ZodTypeAny>> = ZodObject<
    Record<string, ZodTypeAny>
  >,
>(
  type: P,
  params: K,
) => {
  return z.object({
    type: type,
    description: z.string(),
    params: params,
  });
};
