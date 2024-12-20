import { FC } from 'react';
import {
  ColorSwatch,
  ColorSwatchProps,
  Flex,
  Popover,
  PopoverProps,
} from '@mantine/core';

import styles from './ColorsPopover.module.css';

interface IColorsPopoverProps extends PopoverProps {
  colors: string[];
  currentColor: string;
  setCurrentColor: (color: string) => void;
  targetProps?: ColorSwatchProps;
}

export const ColorsPopover: FC<IColorsPopoverProps> = ({
  currentColor,
  colors,
  setCurrentColor,
  targetProps,
  ...attributes
}) => {
  return (
    <Popover {...attributes}>
      <Popover.Target>
        <ColorSwatch
          color={currentColor}
          className={styles.popoverTarget}
          {...targetProps}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Flex gap={10}>
          {colors.map(color => (
            <ColorSwatch
              key={color}
              className={styles.popoverElement}
              component={'button'}
              color={color}
              onClick={() => setCurrentColor(color)}
            />
          ))}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
