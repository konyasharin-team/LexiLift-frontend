import { IDictionaryItem, TestItemType } from '@app-types';

export interface ITestItem {
  id: string | number;
  answerId: IDictionaryItem['id'];
  value: string;
  type: TestItemType;
}
