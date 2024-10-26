import { Roles } from '../../constants';

import { IRoute } from './IRoute.ts';

export interface IPrivateRoute extends IRoute {
  availableFor: (keyof typeof Roles)[];
}
