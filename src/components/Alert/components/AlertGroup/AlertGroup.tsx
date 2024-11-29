import { FC, ReactNode } from 'react';
import { Alert, IAlertProps } from '@components/Alert';
import { FORM_WIDTH } from '@components/Form';
import { Flex } from '@mantine/core';

interface IAlertGroupProps extends IAlertProps {
  children?: ReactNode;
}

export const AlertGroup: FC<IAlertGroupProps> = ({
  children,
  ...attributes
}) => {
  return (
    <Flex direction={'column'} gap={20} align={'center'}>
      <Alert {...attributes} w={FORM_WIDTH} />
      {children}
    </Flex>
  );
};
