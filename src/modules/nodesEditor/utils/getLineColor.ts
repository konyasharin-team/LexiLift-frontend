import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export const getLineColor = (
  fromPins: IPin[],
  fromHandleId: string | null | undefined,
) => {
  return (
    fromPins.find(pin => pin.id === fromHandleId)?.color.outColor ?? 'none'
  );
};
