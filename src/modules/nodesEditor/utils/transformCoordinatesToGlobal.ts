import { ICoordinates } from '@app-types';

export const transformCoordinatesToGlobal = (
  boardRef: HTMLDivElement | null,
  elementRef: HTMLDivElement | null,
  baseCoordinates: ICoordinates,
): ICoordinates => {
  if (boardRef && elementRef) {
    return {
      x:
        boardRef.getBoundingClientRect().width / 2 -
        elementRef.getBoundingClientRect().width / 2 +
        baseCoordinates.x,
      y:
        boardRef.getBoundingClientRect().height / 2 -
        elementRef.getBoundingClientRect().height / 2 -
        baseCoordinates.y,
    };
  }
  return baseCoordinates;
};
