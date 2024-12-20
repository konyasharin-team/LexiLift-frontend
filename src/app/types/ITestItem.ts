import { DictionaryItemSchemaInfer, TestItemType } from '@app-types';

export interface ITestItem {
  id: string | number;
  answerId: DictionaryItemSchemaInfer['id'];
  value: string;
  type: TestItemType;
}
