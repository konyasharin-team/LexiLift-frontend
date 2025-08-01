import { IError, IResponse } from '@api';
import { createInstance } from '@api/utils/createInstance.ts';
import {
  IChangePasswordData,
  IDeleteAccountTargetData,
  ILogoutTargetData,
} from '@modules/authorization';
import { ChangePasswordErrorsSchemaInfer } from '@modules/authorization/types/ChangePasswordErrorsSchema.ts';
import { IAuthData } from '@modules/authorization/types/IAuthData.ts';
import { RegistrationErrorsSchemaInfer } from '@modules/authorization/types/RegistrationErrorsSchema.ts';
import { RegistrationReturnSchemaInfer } from '@modules/authorization/types/RegistrationReturnSchema.ts';
import { TokensErrorsSchemaInfer } from '@modules/authorization/types/TokensErrorsSchema.ts';
import { TokensSchemaInfer } from '@modules/authorization/types/TokensSchema.ts';
import { UserSchemaInfer } from '@modules/authorization/types/UserSchema.ts';
import { AxiosInstance, AxiosResponse } from 'axios';

export class AuthApi {
  static readonly Instance: AxiosInstance = createInstance('/users/auth');

  public static PostRegistration(
    data: IAuthData,
  ): Promise<
    AxiosResponse<
      IResponse<
        RegistrationReturnSchemaInfer,
        IError<RegistrationErrorsSchemaInfer>
      >
    >
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
    AxiosResponse<
      IResponse<
        Pick<TokensSchemaInfer, 'accessToken'>,
        IError<TokensErrorsSchemaInfer>
      >
    >
  > {
    return this.Instance.post('/refresh', data);
  }

  public static GetWhoAmI(): Promise<
    AxiosResponse<IResponse<UserSchemaInfer, IError<TokensErrorsSchemaInfer>>>
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

  public static DeleteAccount(): Promise<
    AxiosResponse<IResponse<undefined, IError>>
  > {
    return this.Instance.post('/deleteAccount');
  }

  public static DeleteAccountTarget(
    data: IDeleteAccountTargetData,
  ): Promise<AxiosResponse<IResponse<undefined, IError>>> {
    return this.Instance.post('/deleteAccount/target', { params: data });
  }
}
