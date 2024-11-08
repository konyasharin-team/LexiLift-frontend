import { ITestItem } from '@app-types';
import { IBoardItem } from '@components/Board';

export interface IDraggableMatchTestCard extends IBoardItem, ITestItem {
  node?: HTMLElement;
}
