import { RequestErrors } from '@api';
import { useI18N } from '@i18n';

import { FoldersErrorsSchemaInfer } from './types/FoldersErrorsSchema';

export const FOLDERS_ERRORS = (
  t: ReturnType<typeof useI18N>['t'],
): RequestErrors<FoldersErrorsSchemaInfer> => {
  return {
    ACCESS_DENIED: t.foldersErrors.accessDenied,
    NOT_FOUND: t.foldersErrors.notFound,
  };
};
