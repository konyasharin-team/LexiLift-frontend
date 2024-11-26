import { ZodType } from 'zod';

export interface IResponseSchemas {
  resultSchema: ZodType;
  errorSchema: ZodType;
}
