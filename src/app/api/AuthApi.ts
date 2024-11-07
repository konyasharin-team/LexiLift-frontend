import { IResponse } from '@api/types/IResponse.ts';
import { IAuthData } from '@app-types/IAuthData.ts';
import { AxiosInstance, AxiosResponse } from 'axios';

import { createInstance } from './createInstance.ts';

export class AuthApi {
  static readonly Instance: AxiosInstance = createInstance('/users/auth/');

  public static PostRegistration(
    data: IAuthData,
  ): Promise<AxiosResponse<IResponse<IAuthData>>> {
    return this.Instance.post('register', data);
  }
}
