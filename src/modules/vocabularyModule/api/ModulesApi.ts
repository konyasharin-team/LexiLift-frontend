import {
  createInstance,
  IError,
  IId,
  IPagination,
  ResponsePromise,
} from '@api';
import { CreateModuleBody } from '@modules/vocabularyModule/types/CreateModuleBody.ts';
import { IModuleApi } from '@modules/vocabularyModule/types/IModuleApi.ts';
import { ModulesError } from '@modules/vocabularyModule/types/ModulesError.ts';
import { PutModuleBody } from '@modules/vocabularyModule/types/PutModuleBody.ts';
import { AxiosInstance } from 'axios';

export class ModulesApi {
  private static readonly Instance: AxiosInstance = createInstance('/modules');

  public static PutModule(
    body: PutModuleBody,
    params: IId,
  ): ResponsePromise<IModuleApi, IError<ModulesError>> {
    return this.Instance.put('/', body, { params });
  }

  public static PostModule(
    body: CreateModuleBody,
  ): ResponsePromise<IModuleApi, IError<ModulesError>> {
    return this.Instance.post('/', body);
  }

  public static DeleteModule(
    params: IId,
  ): ResponsePromise<undefined, IError<ModulesError>> {
    return this.Instance.delete('/', { params });
  }

  public static GetModulesUser(
    params: IPagination,
  ): ResponsePromise<IModuleApi[], IError<ModulesError>> {
    return this.Instance.get('/user', { params });
  }

  public static GetModulesAll(
    params: IPagination,
  ): ResponsePromise<IModuleApi[], IError<ModulesError>> {
    return this.Instance.get('/all', { params });
  }

  public static GetModuleAbout(
    params: IId,
  ): ResponsePromise<IModuleApi, IError<ModulesError>> {
    return this.Instance.get('/about', { params });
  }
}
