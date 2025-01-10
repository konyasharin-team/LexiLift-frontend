import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export interface IEditModuleCardError {
  id: ModuleSchemaInfer['id'];
  cardElement: 'word' | 'translation';
  message: string;
}
