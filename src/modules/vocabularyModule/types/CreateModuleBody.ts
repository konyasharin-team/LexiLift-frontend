import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export type CreateModuleBody = Pick<ModuleSchemaInfer, 'title' | 'description'>;
