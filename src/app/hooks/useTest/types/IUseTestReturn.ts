import { IStatistics, ITestItem } from '@app-types';

export interface IUseTestReturn {
  items: ITestItem[];
  isStarted: boolean;
  start: () => void;
  finish: () => void;
  restart: () => void;
  statistics: IStatistics;
  setStatistics: (newStatistics: IStatistics) => void;
}
