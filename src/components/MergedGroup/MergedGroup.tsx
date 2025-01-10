import {
  Children,
  cloneElement,
  CSSProperties,
  FC,
  isValidElement,
  ReactElement,
} from 'react';
import { Box, Center, Flex, FlexProps } from '@mantine/core';

import styles from './MergedGroup.module.css';

interface IMergedGroupProps extends FlexProps {
  elementHeight?: number | number[];
  elementWidth?: number | number[];
}

export const MergedGroup: FC<IMergedGroupProps> = ({
  children,
  elementHeight,
  elementWidth,
  ...attributes
}) => {
  const calculateSizeProperty = (
    property: 'width' | 'height',
    index: number,
  ) => {
    let value: number | 'auto' = 'auto';
    const externalValue = property === 'width' ? elementWidth : elementHeight;

    if (typeof externalValue === 'number') value = externalValue;
    else if (Array.isArray(externalValue) && index < externalValue.length)
      value = externalValue[index];

    return value;
  };

  return (
    <Flex gap={0} {...attributes}>
      {Children.map(children, (child, index) => {
        const height = calculateSizeProperty('height', index);
        const width = calculateSizeProperty('width', index);
        if (isValidElement(child))
          return (
            <Box className={styles.element} w={width} h={height}>
              <Center h={'100%'} w={'100%'}>
                {cloneElement(
                  child as ReactElement<{ style?: CSSProperties }>,
                  { style: { ...(child.props.style ?? {}), height, width } },
                )}
              </Center>
            </Box>
          );
      })}
    </Flex>
  );
};
