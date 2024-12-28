import { RequestErrors } from '@api';
import { useI18N } from '@i18n';
import { ModulesErrorsSchemaInfer } from '@modules/vocabularyModule/types/ModulesErrorsSchema.ts';

export const MODULES_ERRORS = (
  t: ReturnType<typeof useI18N>['t'],
): RequestErrors<ModulesErrorsSchemaInfer> => {
  return {
    ACCESS_DENIED: t.modulesErrors.accessDenied,
    NOT_FOUND: t.modulesErrors.notFound,
  };
};
