import { ITestItem } from '@app-types/ITestItem.ts';

export const getTestItemsByType = <T extends ITestItem>(
  items: T[],
  type: ITestItem['type'],
) => {
  const foundItems: T[] = [];
  items.forEach(item => {
    if (item.type === type) foundItems.push(item);
  });
  return foundItems;
};
