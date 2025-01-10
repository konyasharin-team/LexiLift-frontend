import {
  ModuleBackendSchemaInfer,
  ModuleSchemaInfer,
} from '@modules/vocabularyModule/types/ModuleSchema.ts';

export const moduleToBackendFieldsTransform = (
  moduleFields: Pick<ModuleSchemaInfer, 'words' | 'tags'>,
): Pick<ModuleBackendSchemaInfer, 'words' | 'tags'> => {
  return {
    words: moduleFields.words.map(wordPair => ({
      ...wordPair,
      description: wordPair.translation,
      pictureUrl: wordPair.img ?? '',
    })),
    tags: moduleFields.tags.map(tagObj => ({
      ...tagObj,
      name: tagObj.tag,
    })),
  };
};
