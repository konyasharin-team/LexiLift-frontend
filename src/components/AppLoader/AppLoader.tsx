import { FC, ReactNode } from 'react';
import { Center, Loader } from '@mantine/core';

interface IAppLoaderProps {
  isLoading: boolean;
  children?: ReactNode;
}

export const AppLoader: FC<IAppLoaderProps> = props => {
  if (props.isLoading)
    return (
      <Center h={'100vh'} w={'100vw'}>
        <Loader />
      </Center>
    );
  else return props.children;
};
