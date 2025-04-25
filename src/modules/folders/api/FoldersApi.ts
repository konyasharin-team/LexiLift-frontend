import {
  createInstance,
  IdSchemaInfer,
  IError,
  IPagination,
  ResponsePromise,
} from '@api';
import { FolderSchemaInfer } from '@modules/folders';
import { CreateFolderBody } from '@modules/folders/types/CreateFolderBody.ts';
import { FoldersErrorsSchemaInfer } from '@modules/folders/types/FoldersErrorsSchema.ts';
import { FoldersPaginationSchemaInfer } from '@modules/folders/types/FoldersPaginationSchema.ts';
import { PutFolderBody } from '@modules/folders/types/PutFolderBody.ts';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';
import { AxiosInstance } from 'axios';

export class FoldersApi {
  private static readonly Instance: AxiosInstance = createInstance('/folders');

  public static PutFolder(
    body: PutFolderBody,
    params: IdSchemaInfer,
  ): ResponsePromise<FolderSchemaInfer, IError<FoldersErrorsSchemaInfer>> {
    return this.Instance.put('/', body, { params });
  }

  public static PostFolder(
    body: CreateFolderBody,
  ): ResponsePromise<FolderSchemaInfer, IError<FoldersErrorsSchemaInfer>> {
    return this.Instance.post('/', body);
  }

  public static DeleteFolder(
    params: IdSchemaInfer,
  ): ResponsePromise<undefined, IError<FoldersErrorsSchemaInfer>> {
    return this.Instance.delete('/', { params });
  }

  public static GetFoldersUser(
    params: IPagination,
  ): ResponsePromise<
    FoldersPaginationSchemaInfer,
    IError<FoldersErrorsSchemaInfer>
  > {
    return this.Instance.get('/user', { params });
  }

  public static GetFoldersAll(
    params: IPagination,
  ): ResponsePromise<
    FoldersPaginationSchemaInfer,
    IError<FoldersErrorsSchemaInfer>
  > {
    return this.Instance.get('/all', { params });
  }

  public static GetFolderAbout(
    params: IdSchemaInfer,
  ): ResponsePromise<FolderSchemaInfer, IError<FoldersErrorsSchemaInfer>> {
    return this.Instance.get('/about', { params });
  }

  public static GetFolderModules(
    params: IdSchemaInfer,
  ): ResponsePromise<ModuleSchemaInfer[], IError<FoldersErrorsSchemaInfer>> {
    return this.Instance.get('/modules', { params: { folderId: params.id } });
  }
}
