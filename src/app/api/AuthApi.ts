import {
  IError,
  ILogoutTargetData,
  IResponse,
  PasswordError,
  RegistrationError,
} from '@api';
import { ITokens } from '@app-types';
import { IUser } from '@app-types/IUser.ts';
import { IPassword } from '@modules/authorization';
import { IAuthData } from '@modules/authorization/types/IAuthData.ts';
import { AxiosInstance, AxiosResponse } from 'axios';

import { createInstance } from './createInstance.ts';
import { IRefreshToken } from '@modules/authorization/types/IRefreshToken.ts';
import { IAccessToken } from '@modules/authorization/types/IAccessToken.ts';

export class AuthApi {
  static readonly Instance: AxiosInstance = createInstance('/users/auth/');

  public static PostRegistration(
    data: IAuthData,
  ): Promise<AxiosResponse<IResponse<undefined, IError<RegistrationError>>>> {
    return this.Instance.post('register', data);
  }

  public static PostLogin(
    data: IAuthData,
  ): Promise<AxiosResponse<IResponse<ITokens, IError>>> {
    return this.Instance.post('login', data);
  }

  public static PostRefresh(
    data: IRefreshToken,
  ): Promise<AxiosResponse<IResponse<IAccessToken, IError>>> {
    return this.Instance.post('refresh', data);
  }

  public static GetWhoAmI(): Promise<AxiosResponse<IResponse<IUser, IError>>> {
    return this.Instance.get(`who-am-i`);
  }

  public static PutPassword(
    data: IPassword,
  ): Promise<AxiosResponse<IResponse<undefined, IError<PasswordError>>>> {
    return this.Instance.put('password', data);
  }

  public static deleteLogout(): Promise<
    AxiosResponse<IResponse<undefined, IError>>
  > {
    return this.Instance.delete('logout');
  }

  public static deleteLogoutTarget(
    data: ILogoutTargetData,
  ): Promise<AxiosResponse<IResponse<undefined, IError>>> {
    return this.Instance.delete('logout/target', { params: data });
  }
}
