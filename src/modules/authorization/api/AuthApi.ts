import { IError, IResponse } from '@api';
import { createInstance } from '@api/utils/createInstance.ts';
import { IChangePasswordData, ILogoutTargetData } from '@modules/authorization';
import { ChangePasswordErrorsSchemaInfer } from '@modules/authorization/types/ChangePasswordErrorsSchema.ts';
import { IAuthData } from '@modules/authorization/types/IAuthData.ts';
import { RegistrationErrorsSchemaInfer } from '@modules/authorization/types/RegistrationErrorsSchema.ts';
import { TokensSchemaInfer } from '@modules/authorization/types/TokensSchema.ts';
import { UserSchemaInfer } from '@modules/authorization/types/UserSchema.ts';
import { AxiosInstance, AxiosResponse } from 'axios';

export class AuthApi {
  static readonly Instance: AxiosInstance = createInstance('/users/auth');

  public static PostRegistration(
    data: IAuthData,
  ): Promise<
    AxiosResponse<IResponse<undefined, IError<RegistrationErrorsSchemaInfer>>>
  > {
    return this.Instance.post('/register', data);
  }

  public static PostLogin(
    data: IAuthData,
  ): Promise<AxiosResponse<IResponse<TokensSchemaInfer, IError>>> {
    return this.Instance.post('/login', data);
  }

  public static PostRefresh(
    data: Pick<TokensSchemaInfer, 'refreshToken'>,
  ): Promise<
    AxiosResponse<IResponse<Pick<TokensSchemaInfer, 'accessToken'>, IError>>
  > {
    return this.Instance.post('/refresh', data);
  }

  public static GetWhoAmI(): Promise<
    AxiosResponse<IResponse<UserSchemaInfer, IError>>
  > {
    return this.Instance.get(`/who-am-i`);
  }

  public static PutPassword(
    data: IChangePasswordData,
  ): Promise<
    AxiosResponse<IResponse<undefined, IError<ChangePasswordErrorsSchemaInfer>>>
  > {
    return this.Instance.put('/password', data);
  }

  public static DeleteLogout(): Promise<
    AxiosResponse<IResponse<undefined, IError>>
  > {
    return this.Instance.delete('/logout');
  }

  public static DeleteLogoutTarget(
    data: ILogoutTargetData,
  ): Promise<AxiosResponse<IResponse<undefined, IError>>> {
    return this.Instance.delete('/logout/target', { params: data });
  }
}
