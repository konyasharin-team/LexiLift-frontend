type TestItemType = 'word' | 'translation';

export interface ITestItem {
  id: string | number;
  value: string;
  type: TestItemType;
}
