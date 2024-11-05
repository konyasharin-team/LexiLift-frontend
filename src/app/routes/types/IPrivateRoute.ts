import { Roles } from '@constants/Roles';

import { IRoute } from './IRoute.ts';

export interface IPrivateRoute extends IRoute {
  availableFor: (keyof typeof Roles)[];
}
