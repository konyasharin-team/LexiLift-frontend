import { ZodType } from 'zod';

export const parse = <T>(schema: ZodType, data: T) => {
  if (import.meta.env.PROD) return schema.safeParse(data);
  else return schema.parse(data);
};
