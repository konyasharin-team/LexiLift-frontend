import { FC, ReactNode } from 'react';
import { Alert, IAlertProps } from '@components/Alert';
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
      <Alert {...attributes} />
      {children}
    </Flex>
  );
};
