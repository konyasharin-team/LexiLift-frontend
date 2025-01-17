import { IBoardItem } from '@components/Board';
import { NodesEditorInfoSchemaInfer } from '@modules/nodesEditor';
import { EditorMode } from '@modules/nodesEditor/types/EditorMode.ts';
import { Viewport } from '@modules/nodesEditor/types/Viewport.ts';

export interface IEditor extends NodesEditorInfoSchemaInfer {
  mode: EditorMode;
  viewport: Viewport;
  content: IBoardItem[];
}
