import { CSSProperties, FC } from 'react';
import { PIN_SIZE } from '@modules/nodesEditor';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { Handle, HandleProps, Position } from '@xyflow/react';
import clsx from 'clsx';

import styles from './Pin.module.css';

interface IPinProps extends Omit<HandleProps, 'color'>, Pick<IPin, 'color'> {
  variant: IPin['type'];
}

export const Pin: FC<IPinProps> = ({
  variant,
  className,
  color,
  style,
  ...attributes
}) => {
  const mergedClassName: string = clsx(
    styles.interrupt,
    styles.pin,
    attributes.position === Position.Right ? styles.pinRight : styles.pinLeft,
    className,
  );
  const mergedStyle: CSSProperties = {
    ...style,
    borderColor: color.outColor,
    backgroundColor: color.innerColor,
    width: PIN_SIZE,
    height: PIN_SIZE,
  };
  switch (variant) {
    case 'base':
      return (
        <Handle
          className={mergedClassName}
          style={mergedStyle}
          {...attributes}
        />
      );
    case 'transition':
      return (
        <Handle
          className={mergedClassName}
          style={mergedStyle}
          {...attributes}
        />
      );
    default:
      return (
        <Handle
          className={mergedClassName}
          style={mergedStyle}
          {...attributes}
        />
      );
  }
};
