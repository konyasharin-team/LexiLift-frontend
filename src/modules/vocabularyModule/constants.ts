import { RequestErrors } from '@api';
import { ModulesErrorsSchemaInfer } from '@modules/vocabularyModule/types/ModulesErrorsSchema.ts';
import { TagColors } from '@modules/vocabularyModule/types/TagColors.ts';

export const GET_MODULE_ABOUT_ERRORS: RequestErrors<ModulesErrorsSchemaInfer> =
  {
    ACCESS_DENIED: 'Вам отказано в доступе к данному модулю',
    NOT_FOUND: 'Модуль не найден',
  };

type TagsKey = 'RED' | 'ORANGE';

export const TagsColors: Record<TagsKey, TagColors> = {
  RED: {
    fontColor: '#e33710',
    backgroundColor: '#ff9b85',
  },
  ORANGE: {
    fontColor: '#fc9700',
    backgroundColor: '#ffe8c6',
  },
} as const;

export const BASE_TAG_COLOR = TagsColors.ORANGE;
