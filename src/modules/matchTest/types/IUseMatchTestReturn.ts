import { RefObject } from 'react';
import { IBoardItem } from '@components/Board';
import { Active, DragEndEvent, Over } from '@dnd-kit/core';
import { IUseTestReturn } from '@hooks';
import { useMatchTestStatisticAnimation } from '@modules/matchTest/hooks/useMatchTestStatisticAnimation.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';

export interface IUseMatchTestReturn
  extends Omit<IUseTestReturn, 'setStatistics'> {
  boardRef: RefObject<HTMLDivElement>;
  round: number;
  animations: IMatchTestAnimation[];
  onAfterSuccess: (id: IBoardItem['id'][]) => void;
  onAfterError: (id: IBoardItem['id'][]) => void;
  onSuccess: (active: Active, over: Over) => void;
  onError: (active: Active, over: Over) => void;
  addAnimations: (animations: IMatchTestAnimation[]) => void;
  onDragEnd: (e: DragEndEvent) => void;
  time: number;
  errorAnimationStyles: ReturnType<
    typeof useMatchTestStatisticAnimation
  >['styles'];
  successAnimationStyles: ReturnType<
    typeof useMatchTestStatisticAnimation
  >['styles'];
}
