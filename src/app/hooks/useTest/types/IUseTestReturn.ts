import { IStatistics } from '@app-types';
import { ITestItem } from '@app-types/ITestItem.ts';
import { Answer } from '@components/Board/types/Answer.ts';

export interface IUseTestReturn {
  items: ITestItem[];
  setItems: (items: ITestItem[]) => void;
  answers: Answer[];
  isStarted: boolean;
  start: () => void;
  finish: () => void;
  restart: () => void;
  statistics: IStatistics;
  setStatistics: (newStatistics: IStatistics) => void;
}
