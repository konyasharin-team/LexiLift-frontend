import { useEffect } from 'react';
import { ErrorSchema, IResponseSchemas, Response } from '@api';
import { z, ZodType } from 'zod';

export const useApiDataParse = <
  TResult,
  TError,
  TResponse extends Response<TResult, TError>,
>(
  responses: (TResponse | undefined)[] | undefined,
  schemas: Partial<IResponseSchemas>,
) => {
  const parseWithDefault = <T>(
    schema: ZodType | undefined,
    defaultSchema: ZodType,
    data: T,
  ) => {
    if (schema) return schema.parse(data);
    else return defaultSchema.parse(data);
  };

  useEffect(() => {
    if (!responses) return;
    responses.forEach(response => {
      if (response) {
        z.boolean().parse(response.data.success);
        if (response.data.result)
          parseWithDefault(
            schemas?.resultSchema,
            z.undefined(),
            response.data.result,
          );
        if (response.data.error)
          parseWithDefault(
            schemas?.errorSchema,
            ErrorSchema(z.string(), z.object({})),
            response.data.error,
          );
      }
    });
  }, [responses, schemas]);
};
