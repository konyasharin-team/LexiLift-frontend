import { createInstance, IError, ResponsePromise } from '@api';
import { TagSchemaInfer, TagsErrorsSchemaInfer } from '@modules/tags';
import { AxiosInstance } from 'axios';

export class TagsApi {
  private static readonly Instance: AxiosInstance = createInstance('/tags');

  public static GetTags(): ResponsePromise<
    TagSchemaInfer['tag'][],
    IError<TagsErrorsSchemaInfer>
  > {
    return this.Instance.get('/own');
  }
}
