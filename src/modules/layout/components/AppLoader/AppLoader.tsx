import { FC, ReactNode } from 'react';
import { Center, Loader } from '@mantine/core';
import { useAppSelector } from '@store';

interface IAppLoaderProps {
  children?: ReactNode;
}

export const AppLoader: FC<IAppLoaderProps> = props => {
  const { appLoadingIsActive } = useAppSelector(state => state.layout);

  if (appLoadingIsActive)
    return (
      <Center h={'100vh'} w={'100vw'}>
        <Loader />
      </Center>
    );
  else return props.children;
};
