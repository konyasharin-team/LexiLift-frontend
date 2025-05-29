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
      fontColor: tag.fontColor,
      backgroundColor: tag.backgroundColor,
      tag: tag.name,
    })),
    words: parsedModule.words.map(wordObj => ({
      id: wordObj.id,
      word: wordObj.word,
      translation: wordObj.description,
      img: wordObj.pictureUrl,
    })),
  };
};
