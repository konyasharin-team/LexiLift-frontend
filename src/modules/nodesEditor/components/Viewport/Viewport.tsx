import { FC, ReactNode, useContext } from 'react';
import { NodesEditorInfoSchemaInfer } from '@modules/nodesEditor';
import {
  EditorContext,
  EditorProvider,
} from '@modules/nodesEditor/components/EditorProvider';
import { Node } from '@modules/nodesEditor/components/Node';
import { ViewportGrid } from '@modules/nodesEditor/components/ViewportGrid';
import { EDITOR_GRID_BOARD_ID } from '@modules/nodesEditor/constants.ts';

interface IViewportProps extends Pick<NodesEditorInfoSchemaInfer, 'name'> {
  children?: ReactNode;
}

interface IViewportInnerProps {
  children?: ReactNode;
}

const ViewportInner: FC<IViewportInnerProps> = props => {
  const editorContext = useContext(EditorContext);

  return (
    <ViewportGrid
      {...(editorContext?.editor.viewport ?? {
        id: EDITOR_GRID_BOARD_ID,
        coordinates: { x: 0, y: 0 },
      })}
      content={editorContext?.editor.content ?? []}
      onDragEnd={editorContext?.onDragEnd}
    >
      {editorContext?.editor.content.map(element => (
        <Node key={element.id} {...element} />
      ))}
      {props.children}
    </ViewportGrid>
  );
};

export const Viewport: FC<IViewportProps> = props => {
  return (
    <EditorProvider name={props.name}>
      <ViewportInner>{props.children}</ViewportInner>
    </EditorProvider>
  );
};
