import { ArrayElement } from '@app-types';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export type TagColors = Pick<
  ArrayElement<ModuleSchemaInfer['tags']>,
  'backgroundColor' | 'fontColor'
>;
