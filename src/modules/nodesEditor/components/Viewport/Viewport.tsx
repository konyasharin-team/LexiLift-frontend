import { FC, ReactNode, useContext, useMemo, useRef } from 'react';
import { ICoordinates } from '@app-types';
import { Board } from '@components/Board';
import {
  NodesEditorInfoSchemaInfer,
  NodesEditorsContext,
} from '@modules/nodesEditor';
import { ViewportGrid } from '@modules/nodesEditor/components/ViewportGrid';
import {
  ViewportContext,
  ViewportProvider,
} from '@modules/nodesEditor/components/ViewportProvider';
import { findEditorIndexById } from '@modules/nodesEditor/utils/findEditorIndexById.ts';

import styles from './Viewport.module.css';

interface IViewportProps extends Pick<NodesEditorInfoSchemaInfer, 'name'> {
  children?: ReactNode;
}

interface IViewportInnerProps {
  children?: ReactNode;
}

const ViewportInner: FC<IViewportInnerProps> = props => {
  const viewportContext = useContext(ViewportContext);
  const editorsContext = useContext(NodesEditorsContext);
  const boardRef = useRef<HTMLDivElement>(null);

  const viewport = useMemo(() => {
    if (
      viewportContext &&
      editorsContext &&
      viewportContext.currentEditorId !== null
    ) {
      const index = findEditorIndexById(
        viewportContext.currentEditorId,
        editorsContext.editors,
      );
      if (index !== -1) return editorsContext.editors[index].viewport;
    }
    return undefined;
  }, [
    viewportContext?.currentEditorId,
    viewportContext,
    editorsContext,
    editorsContext?.editors,
  ]);

  console.log(viewport);

  const transformCoordinatesToGlobal = (
    baseCoordinates: ICoordinates,
  ): ICoordinates => {
    if (boardRef.current) {
      return {
        x:
          boardRef.current.getBoundingClientRect().width / 2 +
          baseCoordinates.x,
        y:
          boardRef.current.getBoundingClientRect().height / 2 +
          baseCoordinates.y,
      };
    }
    return baseCoordinates;
  };

  if (!viewport) return null;
  return (
    <Board
      modifiers={[]}
      items={[
        {
          ...viewport,
          coordinates: transformCoordinatesToGlobal(viewport.coordinates),
        },
      ]}
      className={styles.viewport}
      onDragEnd={viewportContext?.onDragEnd}
      ref={boardRef}
    >
      <ViewportGrid {...viewport}>{props.children}</ViewportGrid>
    </Board>
  );
};

export const Viewport: FC<IViewportProps> = props => {
  return (
    <ViewportProvider name={props.name}>
      <ViewportInner>{props.children}</ViewportInner>
    </ViewportProvider>
  );
};
