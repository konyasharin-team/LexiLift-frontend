import { NodesEditorSchemaInfer } from '@modules/nodesEditor';

export const findEditorById = (
  id: NodesEditorSchemaInfer['id'],
  editors: NodesEditorSchemaInfer[],
) => {
  const foundIndex = editors.findIndex(editor => editor.id === id);
  if (foundIndex === -1) {
    console.error(`Editor with id ${id} not found`);
  }
  return foundIndex;
};
