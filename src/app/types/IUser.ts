import { Roles } from '@constants';

export interface IUser {
  id: number;
  email: string;
  activated: boolean;
  permissionGroup: keyof typeof Roles;
  authorities: [{ authority: string }];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}
