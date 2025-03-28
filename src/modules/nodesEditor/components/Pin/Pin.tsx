import { CSSProperties, FC, ReactNode } from 'react';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { PinVariant } from '@modules/nodesEditor/types/PinVariant.ts';
import { IconArrowBigRightFilled } from '@tabler/icons-react';
import { Handle, HandleProps, Position } from '@xyflow/react';
import clsx from 'clsx';

import styles from './Pin.module.css';

interface IPinProps
  extends Omit<HandleProps, 'color'>,
    Pick<IPin, 'color' | 'size'> {
  variant: PinVariant;
  wrapperSize?: number;
}

export const Pin: FC<IPinProps> = ({
  variant,
  className,
  color,
  style,
  size,
  wrapperSize,
  ...attributes
}) => {
  const mergedClassName: string = clsx(
    styles.interrupt,
    styles.pin,
    attributes.position === Position.Right ? styles.pinRight : styles.pinLeft,
    variant === 'transition' ? styles.transition : undefined,
    className,
  );
  const mergedStyle: CSSProperties = {
    ...style,
    borderColor: color.outColor,
    backgroundColor: color.innerColor,
    width: size,
    height: size,
  };

  const wrap = (children: ReactNode) => {
    return (
      <div
        style={{ height: wrapperSize, width: wrapperSize }}
        className={styles.wrapper}
      >
        {children}
      </div>
    );
  };

  switch (variant) {
    case 'base':
      return wrap(
        <Handle
          className={mergedClassName}
          style={mergedStyle}
          {...attributes}
        />,
      );
    case 'transition':
      return wrap(
        <Handle
          className={mergedClassName}
          style={{
            ...mergedStyle,
            borderColor: 'none',
            backgroundColor: 'none',
          }}
          {...attributes}
        >
          <IconArrowBigRightFilled
            color={'white'}
            style={{
              ...mergedStyle,
              pointerEvents: 'none',
              borderColor: 'none',
              backgroundColor: 'none',
            }}
          />
        </Handle>,
      );
    default:
      return wrap(
        <Handle
          className={mergedClassName}
          style={mergedStyle}
          {...attributes}
        />,
      );
  }
};
