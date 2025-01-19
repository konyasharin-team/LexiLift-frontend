import { FC } from 'react';
import { AppNode } from '@modules/nodesEditor/types/AppNode.ts';
import { getLineColor } from '@modules/nodesEditor/utils/getLineColor.ts';
import { ConnectionLineComponentProps, getBezierPath } from '@xyflow/react';

export const BaseConnectionLine: FC<
  ConnectionLineComponentProps<AppNode>
> = props => {
  const [edgePath] = getBezierPath({
    sourceX: props.fromX,
    sourceY: props.fromY,
    targetX: props.toX,
    targetY: props.toY,
    sourcePosition: props.fromPosition,
    targetPosition: props.toPosition,
  });
  const color = getLineColor(props.fromNode.data.out, props.fromHandle.id);

  return (
    <g>
      <path
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={props.toX}
        cy={props.toY}
        fill="#fff"
        r={3}
        stroke={color}
        strokeWidth={1.5}
      />
    </g>
  );
};
