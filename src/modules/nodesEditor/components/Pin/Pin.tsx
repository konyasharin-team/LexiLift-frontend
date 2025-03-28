import { CSSProperties, FC, ReactNode, useContext } from 'react';
import { Text } from '@mantine/core';
import { EditorContext } from '@modules/nodesEditor';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { PinVariant } from '@modules/nodesEditor/types/PinVariant.ts';
import { getIsConnectedPin } from '@modules/nodesEditor/utils/getIsConnectedPin.ts';
import { IconArrowBigRightFilled } from '@tabler/icons-react';
import { Handle, HandleProps, Position } from '@xyflow/react';
import clsx from 'clsx';

import styles from './Pin.module.css';

interface IPinProps extends Omit<HandleProps, 'color'> {
  pin: IPin;
  variant: PinVariant;
  wrapperSize?: number;
}

export const Pin: FC<IPinProps> = ({
  variant,
  className,
  pin,
  style,
  wrapperSize,
  position,
  ...attributes
}) => {
  const context = useContext(EditorContext);
  const mergedClassName: string = clsx(
    styles.interrupt,
    styles.pin,
    position === Position.Right ? styles.pinRight : styles.pinLeft,
    variant === 'transition' ? styles.transition : undefined,
    className,
  );
  const mergedStyle: CSSProperties = {
    ...style,
    borderColor: pin.color.outColor,
    backgroundColor: context
      ? getIsConnectedPin(context.editor.edges, pin)
        ? pin.color.outColor
        : pin.color.innerColor
      : pin.color.innerColor,
    width: pin.size,
    height: pin.size,
  };

  const wrap = (children: ReactNode) => {
    return (
      <div className={styles.titleBlock}>
        {position === Position.Right && <Text>{pin.title}</Text>}
        <div
          style={{ height: wrapperSize ?? 'auto' }}
          className={styles.wrapper}
        >
          {children}
        </div>
        {position === Position.Left && <Text>{pin.title}</Text>}
      </div>
    );
  };

  switch (variant) {
    case 'base':
      return wrap(
        <Handle
          className={mergedClassName}
          style={mergedStyle}
          position={position}
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
          position={position}
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
          position={position}
          className={mergedClassName}
          style={mergedStyle}
          {...attributes}
        />,
      );
  }
};
