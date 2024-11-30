import { forwardRef, ReactNode } from 'react';
import { FORM_WIDTH } from '@components/Form';
import { Flex, Paper } from '@mantine/core';

export interface IFormWrapperProps {
  fullWidth?: boolean;
  children?: ReactNode;
}

export const FormWrapper = forwardRef<HTMLDivElement, IFormWrapperProps>(
  (props, ref) => {
    return (
      <Flex justify="center" ref={ref} w={'100%'}>
        <Paper
          radius="lg"
          withBorder
          shadow="xl"
          p="xl"
          w={props.fullWidth ? '100%' : FORM_WIDTH}
        >
          {props.children}
        </Paper>
      </Flex>
    );
  },
);
