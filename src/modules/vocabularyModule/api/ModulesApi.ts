import {
  createInstance,
  IdSchemaInfer,
  IError,
  IPagination,
  ResponsePromise,
} from '@api';
import { CreateModuleBody } from '@modules/vocabularyModule/types/CreateModuleBody.ts';
import { ModuleBackendSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { ModulesErrorsSchemaInfer } from '@modules/vocabularyModule/types/ModulesErrorsSchema.ts';
import { ModulesPaginationBackendSchemaInfer } from '@modules/vocabularyModule/types/ModulesPaginationSchema.ts';
import { PutModuleBody } from '@modules/vocabularyModule/types/PutModuleBody.ts';
import { AxiosInstance } from 'axios';

export class ModulesApi {
  private static readonly Instance: AxiosInstance = createInstance('/modules');

  public static PutModule(
    body: PutModuleBody,
    params: IdSchemaInfer,
  ): ResponsePromise<undefined, IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.put('/', body, { params });
  }

  public static PostModule(
    body: CreateModuleBody,
  ): ResponsePromise<
    ModuleBackendSchemaInfer,
    IError<ModulesErrorsSchemaInfer>
  > {
    return this.Instance.post('/', body);
  }

  public static DeleteModule(
    params: IdSchemaInfer,
  ): ResponsePromise<undefined, IError<ModulesErrorsSchemaInfer>> {
    return this.Instance.delete('/', { params });
  }

  public static GetModulesUser(
    params: IPagination,
  ): ResponsePromise<
    ModulesPaginationBackendSchemaInfer,
    IError<ModulesErrorsSchemaInfer>
  > {
    return this.Instance.get('/user', { params });
  }

  public static GetModulesAll(
    params: IPagination,
  ): ResponsePromise<
    ModulesPaginationBackendSchemaInfer,
    IError<ModulesErrorsSchemaInfer>
  > {
    return this.Instance.get('/all', { params });
  }

  public static GetModuleAbout(
    params: IdSchemaInfer,
  ): ResponsePromise<
    ModuleBackendSchemaInfer,
    IError<ModulesErrorsSchemaInfer>
  > {
    return this.Instance.get('/about', { params });
  }
}
