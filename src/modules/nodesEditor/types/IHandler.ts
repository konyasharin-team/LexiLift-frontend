import { IPin } from './IPin';

export interface IHandler {
  handlePins: (pins: IPin[]) => IPin[];
}
