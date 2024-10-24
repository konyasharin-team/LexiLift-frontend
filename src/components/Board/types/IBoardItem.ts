import { UniqueIdentifier } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/core/dist/types';

export interface IBoardItem {
  id: UniqueIdentifier;
  coordinates?: Coordinates;
}
