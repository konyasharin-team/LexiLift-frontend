import { IUseTestReturn } from '@hooks';
import { IDraggableMatchTestCard } from '@modules/matchTest/types/IDraggableMatchTestCard.ts';

export interface IUseMatchTestItemsWrapperReturn
  extends Omit<IUseTestReturn, 'items' | 'setItems'> {
  items: IDraggableMatchTestCard[];
  setItems: (items: IDraggableMatchTestCard[]) => void;
}
