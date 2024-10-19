import { RefObject } from 'react';
import { IBoardItem } from '@components/Board';
import { DragEndEvent } from '@dnd-kit/core';
import { IUseTestReturn } from '@hooks/useTest';
import { IDraggableMatchTestCard } from '@modules/matchTest/types/IDraggableMatchTestCard.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';

export interface IUseMatchTestReturn extends IUseTestReturn{
  boardRef: RefObject<HTMLDivElement>;
  round: number;
  animations: IMatchTestAnimation[];
  onSuccess: (id: IBoardItem['id'][]) => void;
  onError: (id: IBoardItem['id'][]) => void;
  addAnimations: (animations: IMatchTestAnimation[]) => void;
  onDragEnd: (e: DragEndEvent) => void;
  draggableItems: IDraggableMatchTestCard[];
  time: number;
}
