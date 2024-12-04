import { RequestErrors } from '@api';
import { ModulesErrorsSchemaInfer } from '@modules/vocabularyModule/types/ModulesErrorsSchema.ts';

export const GET_MODULE_ABOUT_ERRORS: RequestErrors<ModulesErrorsSchemaInfer> =
  {
    ACCESS_DENIED: 'Вам отказано в доступе к данному модулю',
    NOT_FOUND: 'Модуль не найден',
  };
