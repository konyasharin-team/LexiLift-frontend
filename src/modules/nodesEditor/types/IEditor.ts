import { IBoardItem } from '@components/Board';
import { NodesEditorInfoSchemaInfer } from '@modules/nodesEditor';
import { Viewport } from '@modules/nodesEditor/types/Viewport.ts';

export interface IEditor extends NodesEditorInfoSchemaInfer {
  viewport: Viewport;
  content: IBoardItem[];
}
