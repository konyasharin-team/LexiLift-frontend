import { createInstance, IError, IPagination, IResponse } from '@api';
import { CreateModuleData } from '@modules/vocabularyModule/types/CreateModuleData.ts';
import { IModuleApi } from '@modules/vocabularyModule/types/IModuleApi.ts';
import { ModulesError } from '@modules/vocabularyModule/types/ModulesError.ts';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ModulesApi {
  static readonly Instance: AxiosInstance = createInstance('/modules');

  public static GetModulesUser(
    data: IPagination,
  ): Promise<AxiosResponse<IResponse<IModuleApi[], IError<ModulesError>>>> {
    return this.Instance.get('/user', { params: data });
  }

  public static PostModules(
    data: CreateModuleData,
  ): Promise<AxiosResponse<IModuleApi, IError<ModulesError>>> {
    return this.Instance.post('/', data);
  }
}
