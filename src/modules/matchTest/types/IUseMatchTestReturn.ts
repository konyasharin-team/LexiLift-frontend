import { RefObject } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { IUseTestReturn } from '@hooks';
import { useMatchTestShowCardAnimation } from '@modules/matchTest/hooks/useMatchTestShowCardAnimation.ts';
import { useMatchTestStatisticAnimation } from '@modules/matchTest/hooks/useMatchTestStatisticAnimation.ts';
import { IDraggableMatchTestCard } from '@modules/matchTest/types/IDraggableMatchTestCard.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';

export interface IUseMatchTestReturn
  extends Pick<IUseTestReturn, 'isStarted' | 'start' | 'statistics'> {
  items: IDraggableMatchTestCard[];
  setItems: (newItems: IDraggableMatchTestCard[]) => void;
  boardRef: RefObject<HTMLDivElement>;
  round: number;
  animations: IMatchTestAnimation[];
  onDragEnd: (e: DragEndEvent) => void;
  time: number;
  errorAnimationScope: ReturnType<
    typeof useMatchTestStatisticAnimation
  >['scope'];
  successAnimationScope: ReturnType<
    typeof useMatchTestStatisticAnimation
  >['scope'];
  showCardsAnimationScope: ReturnType<
    typeof useMatchTestShowCardAnimation
  >['scope'];
}
