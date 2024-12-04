import { IdSchemaInfer } from '@api';
import { Middleware } from '@hooks/useParsedParams/types/Middleware.ts';

export const idMiddleware: Middleware<IdSchemaInfer> = params => {
  return {
    id: params['id'] ? +params['id'] : undefined,
  };
};
