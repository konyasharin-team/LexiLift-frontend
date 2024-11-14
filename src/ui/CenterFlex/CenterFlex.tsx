import { FC, ReactNode } from 'react';
import { Flex } from '@mantine/core';

interface ICenterFlexProps {
  children?: ReactNode;
}

export const CenterFlex: FC<ICenterFlexProps> = props => {
  return (
    <Flex w={'100%'} h={'100%'} justify={'center'} align={'center'}>
      {props.children}
    </Flex>
  );
};
