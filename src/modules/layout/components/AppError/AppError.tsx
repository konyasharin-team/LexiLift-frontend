import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, Center, Flex, Text } from '@mantine/core';
import { appPaths } from '@routes';
import { useActions, useAppSelector } from '@store';

interface IAppErrorProps {
  children?: ReactNode;
}

export const AppError: FC<IAppErrorProps> = props => {
  const { appError } = useAppSelector(state => state.layout);
  const { user } = useAppSelector(state => state.auth);
  const { setAppError } = useActions();
  if (appError)
    return (
      <Center mt={200}>
        <Flex gap={30} direction={'column'} align={'center'}>
          <Text fw={700} fz={36} tt={'uppercase'}>
            {appError}
          </Text>
          <Button
            component={Link}
            to={user ? appPaths.MODULES : appPaths.AUTHORIZATION}
            size={'xl'}
            onClick={() => setAppError(null)}
          >
            {user ? 'Вернуться на главную' : 'Вернуться к авторизации'}
          </Button>
        </Flex>
      </Center>
    );
  else return props.children;
};
