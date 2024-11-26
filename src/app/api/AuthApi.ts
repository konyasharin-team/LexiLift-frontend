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

import { createInstance } from './utils/createInstance.ts';

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
    data: Pick<ITokens, 'refreshToken'>,
  ): Promise<AxiosResponse<IResponse<Pick<ITokens, 'accessToken'>, IError>>> {
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

  public static DeleteLogout(): Promise<
    AxiosResponse<IResponse<undefined, IError>>
  > {
    return this.Instance.delete('logout');
  }

  public static DeleteLogoutTarget(
    data: ILogoutTargetData,
  ): Promise<AxiosResponse<IResponse<undefined, IError>>> {
    return this.Instance.delete('logout/target', { params: data });
  }
}
