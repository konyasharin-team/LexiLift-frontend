import { IEditor } from '@modules/nodesEditor/types/IEditor.ts';
import { IMouseEvent } from '@modules/nodesEditor/types/IMouseEvent.ts';

export abstract class Tool {
  protected editor: IEditor;

  protected constructor(editor: IEditor) {
    this.editor = editor;
  }

  abstract OnMouseDown?(info: IMouseEvent): void;

  abstract OnMouseUp?(info: IMouseEvent): void;

  abstract OnMouseMove?(info: IMouseEvent): void;
}
