import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export type PutModuleBody = Pick<ModuleSchemaInfer, 'title' | 'description'>;
