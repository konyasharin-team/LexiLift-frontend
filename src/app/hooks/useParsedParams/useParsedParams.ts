import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Middleware } from '@hooks/useParsedParams/types/Middleware.ts';
import { appPaths } from '@routes';
import { ZodType } from 'zod';

export const useParsedParams = <T>(
  type: ZodType,
  middleware: Middleware<T>,
  errorPath: string = appPaths.MODULES,
) => {
  const navigate = useNavigate();
  const params = useParams();
  const [parsedParams, setParsedParams] = useState<T | undefined>();

  useEffect(() => {
    try {
      setParsedParams(type.parse(middleware(params)));
    } catch (e) {
      navigate(errorPath);
      console.error(e);
    }
  }, [params]);

  return parsedParams;
};
