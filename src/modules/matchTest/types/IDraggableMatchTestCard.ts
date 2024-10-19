import { IBoardItem } from '@components/Board';
import { DraggableMatchTestCardType } from '@modules/matchTest/types/DraggableMatchTestCardType.ts';

export interface IDraggableMatchTestCard extends IBoardItem {
  value: string;
  type: DraggableMatchTestCardType;
  node?: HTMLElement;
}
