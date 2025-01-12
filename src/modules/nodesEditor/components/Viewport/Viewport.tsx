import { FC, ReactNode, useContext, useEffect, useMemo } from 'react';
import { Board } from '@components/Board';
import {
  NodesEditorInfoSchemaInfer,
  NodesEditorsContext,
} from '@modules/nodesEditor';
import {
  EditorContext,
  EditorProvider,
} from '@modules/nodesEditor/components/EditorProvider';
import { Node } from '@modules/nodesEditor/components/Node';
import { ViewportGrid } from '@modules/nodesEditor/components/ViewportGrid';
import { EDITOR_GRID_BOARD_ID } from '@modules/nodesEditor/constants.ts';
import { findEditorIndexById } from '@modules/nodesEditor/utils/findEditorIndexById.ts';

import styles from './Viewport.module.css';

interface IViewportProps extends Pick<NodesEditorInfoSchemaInfer, 'name'> {
  children?: ReactNode;
}

interface IViewportInnerProps {
  children?: ReactNode;
}

const ViewportInner: FC<IViewportInnerProps> = props => {
  const editorContext = useContext(EditorContext);
  const editorsContext = useContext(NodesEditorsContext);

  const editor = useMemo(() => {
    if (
      editorContext &&
      editorsContext &&
      editorContext.currentEditorId !== null
    ) {
      const index = findEditorIndexById(
        editorContext.currentEditorId,
        editorsContext.editors,
      );
      if (index !== -1) return editorsContext.editors[index];
    }
    return undefined;
  }, [editorContext?.currentEditorId, editorsContext?.editors]);

  useEffect(() => {
    if (editor) editorContext?.update();
  }, [editor]);

  return (
    <Board
      modifiers={[]}
      ref={el => {
        if (editorContext) editorContext.refs.current.board = el;
      }}
      items={editor ? [editor.viewport, ...editor.content] : []}
      className={styles.viewport}
      onDragEnd={editorContext?.onDragEnd}
    >
      <ViewportGrid
        {...(editor?.viewport ?? {
          id: EDITOR_GRID_BOARD_ID(0),
          coordinates: { x: 0, y: 0 },
        })}
        content={editor?.content ?? []}
        ref={el => {
          if (editorContext) editorContext.refs.current.viewport = el;
        }}
      >
        {editor?.content.map((element, i) => (
          <Node
            key={element.id}
            ref={el => {
              console.log('set');
              if (editorContext) editorContext.refs.current.content[i] = el;
            }}
            {...element}
          />
        ))}
        {props.children}
      </ViewportGrid>
    </Board>
  );
};

export const Viewport: FC<IViewportProps> = props => {
  return (
    <EditorProvider name={props.name}>
      <ViewportInner>{props.children}</ViewportInner>
    </EditorProvider>
  );
};
