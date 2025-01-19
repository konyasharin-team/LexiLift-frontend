import { FC, useContext } from 'react';
import { EditorContext } from '@modules/nodesEditor';
import { BaseEdgeType } from '@modules/nodesEditor/types/BaseEdgeType.ts';
import { getLineColor } from '@modules/nodesEditor/utils/getLineColor.ts';
import {
  BaseEdge as BaseEdgeReactFlow,
  EdgeProps,
  getBezierPath,
} from '@xyflow/react';

export const BaseEdge: FC<EdgeProps<BaseEdgeType>> = props => {
  const context = useContext(EditorContext);
  const [edgePath] = getBezierPath(props);

  if (!context) return undefined;
  return (
    <BaseEdgeReactFlow
      path={edgePath}
      markerEnd={props.markerEnd}
      z={1}
      labelStyle={{
        zIndex: 1,
      }}
      style={{
        stroke: getLineColor(
          context.editor.nodes.find(node => node.id === props.source)?.data
            .out ?? [],
          props.sourceHandleId,
        ),
        zIndex: 1,
        ...props.style,
      }}
    />
  );
};
