import { forwardRef, ReactNode } from 'react';
import { Flex, Paper } from '@mantine/core';

interface IFormWrapperProps {
  children?: ReactNode;
}

export const FormWrapper = forwardRef<HTMLDivElement, IFormWrapperProps>(
  (props, ref) => {
    return (
      <Flex justify="center" ref={ref}>
        <Paper radius="lg" withBorder shadow="xl" p="xl" mt={120} w={700}>
          {props.children}
        </Paper>
      </Flex>
    );
  },
);
