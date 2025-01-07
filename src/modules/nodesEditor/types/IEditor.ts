import { NodesEditorInfoSchemaInfer } from '@modules/nodesEditor';
import { IViewport } from '@modules/nodesEditor/types/IViewport.ts';

export interface IEditor extends NodesEditorInfoSchemaInfer {
  viewport: IViewport;
}
