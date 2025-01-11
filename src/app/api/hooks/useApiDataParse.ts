import { useEffect } from 'react';
import { BaseErrorSchema, IResponseSchemas, Response } from '@api';
import { z, ZodType } from 'zod';

export const useApiDataParse = <
  TResult,
  TError,
  TResponse extends Response<TResult, TError>,
>(
  responses: (TResponse | undefined)[] | undefined,
  schemas?: Partial<IResponseSchemas>,
) => {
  const parseWithDefault = <T>(
    schema: ZodType | undefined,
    defaultSchema: ZodType,
    data: T,
  ) => {
    const schemaToCheck = schema ?? defaultSchema;
    if (import.meta.env.PROD) return schemaToCheck.safeParse(data);
    else return schemaToCheck.parse(data);
  };

  useEffect(() => {
    if (!responses) return;
    responses.forEach(response => {
      if (response) {
        if (import.meta.env.PROD) z.boolean().safeParse(response.data.success);
        else z.boolean().parse(response.data.success);
        if (response.data.result)
          parseWithDefault(
            schemas?.resultSchema,
            z.undefined(),
            response.data.result,
          );
        if (response.data.error)
          parseWithDefault(
            schemas?.errorSchema,
            BaseErrorSchema,
            response.data.error,
          );
      }
    });
  }, [responses, schemas]);
};
