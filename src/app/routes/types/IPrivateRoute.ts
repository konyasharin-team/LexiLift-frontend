import { Roles } from '@constants/roles.ts';

import { IRoute } from './IRoute.ts';

export interface IPrivateRoute extends IRoute {
  availableFor: (keyof Omit<typeof Roles, 'SUPER_ADMIN'>)[];
}
