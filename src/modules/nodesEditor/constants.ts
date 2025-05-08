import { IEditor } from '@modules/nodesEditor/types/IEditor.ts';

export const EDITOR_GRID_BOARD_ID = (id: IEditor['id']) => {
  return `editor-grid-${id}`;
};
