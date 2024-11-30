import { FC, ReactNode } from 'react';
import { AppLayoutToggle } from '@modules/layout';
import { IPrivateRoute } from '@routes';

interface IRouteProps extends Partial<Pick<IPrivateRoute, 'withLayout'>> {
  children?: ReactNode;
}

export const RouteWrapper: FC<IRouteProps> = props => {
  return (
    <AppLayoutToggle withLayout={props.withLayout ?? false}>
      {props.children}
    </AppLayoutToggle>
  );
};
