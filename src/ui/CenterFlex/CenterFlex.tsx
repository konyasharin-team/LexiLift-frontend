import { forwardRef, ReactNode } from 'react';
import { Flex } from '@mantine/core';

interface ICenterFlexProps {
  children?: ReactNode;
}

export const CenterFlex = forwardRef<HTMLDivElement, ICenterFlexProps>(
  (props, ref) => {
    return (
      <Flex w={'100%'} h={'100%'} justify={'center'} align={'center'} ref={ref}>
        {props.children}
      </Flex>
    );
  },
);
