import { useEffect } from 'react';
import { BaseErrorSchema, IResponseSchemas, Response } from '@api';
import { parse } from '@utils';
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
    parse(schemaToCheck, data);
  };

  useEffect(() => {
    if (!responses) return;
    responses.forEach(response => {
      if (response) {
        parse(z.boolean(), response.data.success);
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
