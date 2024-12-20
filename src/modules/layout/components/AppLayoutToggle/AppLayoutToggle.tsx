import { FC, ReactNode, useEffect, useLayoutEffect } from 'react';
import { IPrivateRoute } from '@routes';
import { useActions, useAppSelector } from '@store';

interface IAppLayoutToggleProps extends Pick<IPrivateRoute, 'withLayout'> {
  children?: ReactNode;
}

export const AppLayoutToggle: FC<IAppLayoutToggleProps> = props => {
  const { setAppLayoutIsActive, setAppLayoutIsInit } = useActions();
  const { appLayoutIsInit } = useAppSelector(state => state.layout);

  useLayoutEffect(() => {
    if (!appLayoutIsInit) {
      setAppLayoutIsActive(props.withLayout ?? false);
      setAppLayoutIsInit(true);
    }
  }, []);

  useEffect(() => {
    setAppLayoutIsActive(props.withLayout ?? false);
  }, [props.withLayout]);

  return <>{props.children}</>;
};
