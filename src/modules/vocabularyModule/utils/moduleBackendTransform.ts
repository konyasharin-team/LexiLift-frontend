import {
  ModuleBackendSchema,
  ModuleBackendSchemaInfer,
  ModuleSchemaInfer,
} from '@modules/vocabularyModule/types/ModuleSchema.ts';

export const moduleBackendTransform = (
  module: ModuleBackendSchemaInfer,
): ModuleSchemaInfer => {
  const parsedModule = ModuleBackendSchema.parse(module);
  return {
    ...parsedModule,
    words: parsedModule.words.map(word => ({
      ...word,
      translation: word.description,
      img: word.pictureUrl,
    })),
  };
};
