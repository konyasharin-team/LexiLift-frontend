import { IBoardItem } from '@components/Board';

type Animation = 'error' | 'success';

export interface IMatchTestAnimation {
  itemId: IBoardItem['id'];
  type: Animation;
  timeLeft: number;
}
