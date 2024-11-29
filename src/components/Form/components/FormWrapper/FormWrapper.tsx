import { forwardRef, ReactNode } from 'react';
import { FORM_WIDTH } from '@components/Form';
import { Flex, Paper } from '@mantine/core';

interface IFormWrapperProps {
  children?: ReactNode;
}

export const FormWrapper = forwardRef<HTMLDivElement, IFormWrapperProps>(
  (props, ref) => {
    return (
      <Flex justify="center" ref={ref}>
        <Paper radius="lg" withBorder shadow="xl" p="xl" w={FORM_WIDTH}>
          {props.children}
        </Paper>
      </Flex>
    );
  },
);
