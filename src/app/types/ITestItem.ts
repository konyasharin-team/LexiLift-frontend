import { TestItemType } from '@app-types';

export interface ITestItem {
  id: string | number;
  value: string;
  type: TestItemType;
}
