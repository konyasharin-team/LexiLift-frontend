import { ModuleBackendSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export type CreateModuleBody = Pick<
  ModuleBackendSchemaInfer,
  'title' | 'description' | 'tags' | 'words'
>;
