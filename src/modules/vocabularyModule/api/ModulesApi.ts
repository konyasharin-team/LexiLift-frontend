import {
  createInstance,
  IError,
  IId,
  IPagination,
  ResponsePromise,
} from '@api';
import { CreateModuleBody } from '@modules/vocabularyModule/types/CreateModuleBody.ts';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { ModulesErrorsSchemaInfer } from '@modules/vocabularyModule/types/ModulesErrorsSchema.ts';
import { PutModuleBody } from '@modules/vocabularyModule/types/PutModuleBody.ts';
import { AxiosInstance } from 'axios';

export class ModulesApi {
  private static readonly Instance: AxiosInstance = createInstance('/modules');

  public static PutModule(
    body: PutModuleBody,
    params: IId,
  ): ResponsePromise<ModuleSchemaInfer, IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.put('/', body, { params });
  }

  public static PostModule(
    body: CreateModuleBody,
  ): ResponsePromise<ModuleSchemaInfer, IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.post('/', body);
  }

  public static DeleteModule(
    params: IId,
  ): ResponsePromise<undefined, IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.delete('/', { params });
  }

  public static GetModulesUser(
    params: IPagination,
  ): ResponsePromise<ModuleSchemaInfer[], IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.get('/user', { params });
  }

  public static GetModulesAll(
    params: IPagination,
  ): ResponsePromise<ModuleSchemaInfer[], IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.get('/all', { params });
  }

  public static GetModuleAbout(
    params: IId,
  ): ResponsePromise<ModuleSchemaInfer, IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.get('/about', { params });
  }
}
