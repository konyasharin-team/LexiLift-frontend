import { createInstance, IError, ResponsePromise } from '@api';
import { AxiosInstance } from 'axios';

import { TagSchemaBackend } from '../types/TagSchema.ts';
import { TagsErrorsSchemaInfer } from '../types/TagsErrorsSchema.ts';

export class TagsApi {
  private static readonly Instance: AxiosInstance = createInstance('/tags');

  public static GetTags(): ResponsePromise<
    TagSchemaBackend[],
    IError<TagsErrorsSchemaInfer>
  > {
    return this.Instance.get('/own');
  }
}
