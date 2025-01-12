import { IEditor } from '@modules/nodesEditor/types/IEditor.ts';

export const findEditorIndexById = (
  id: IEditor['id'],
  editors: IEditor[],
  withError?: boolean,
) => {
  const foundIndex = editors.findIndex(editor => editor.id === id);
  if (foundIndex === -1 && withError) {
    console.error(`Editor with id ${id} not found`);
  }
  return foundIndex;
};
