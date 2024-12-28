import {
  ModuleBackendSchema,
  ModuleBackendSchemaInfer,
  ModuleSchemaInfer,
} from '@modules/vocabularyModule/types/ModuleSchema.ts';

export const moduleFromBackendFieldsTransform = (
  module: Pick<ModuleBackendSchemaInfer, 'tags' | 'words'>,
): Pick<ModuleSchemaInfer, 'tags' | 'words'> => {
  const parsedModule = ModuleBackendSchema.parse(module);
  return {
    tags: parsedModule.tags.map(tag => ({
      ...tag,
      tag: tag.name,
    })),
    words: parsedModule.words.map(word => ({
      ...word,
      translation: word.description,
      img: word.pictureUrl,
    })),
  };
};
