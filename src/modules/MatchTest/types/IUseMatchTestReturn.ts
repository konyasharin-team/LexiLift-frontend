import { RefObject } from 'react';
import { ITestItem } from '@app-types/ITestItem.ts';
import { IBoardItem } from '@components/Board';
import { Answer } from '@components/Board/types/Answer.ts';
import { DragEndEvent } from '@dnd-kit/core';
import { IUseTimerReturn } from '@hooks/useTimer';
import { IDraggableMatchTestCard } from '@modules/MatchTest/types/IDraggableMatchTestCard.ts';
import { IMatchTestAnimation } from '@modules/MatchTest/types/IMatchTestAnimation.ts';

export interface IUseMatchTestReturn {
  cards: ITestItem[];
  setCards: (cards: ITestItem[]) => void;
  boardRef: RefObject<HTMLDivElement>;
  round: number;
  animations: IMatchTestAnimation[];
  start: (() => void) | undefined;
  onSuccess: (id: IBoardItem['id'][]) => void;
  onError: (id: IBoardItem['id'][]) => void;
  addAnimations: (animations: IMatchTestAnimation[]) => void;
  answers: Answer[];
  onDragEnd: (e: DragEndEvent) => void;
  draggableItems: IDraggableMatchTestCard[];
  timer: IUseTimerReturn;
}
