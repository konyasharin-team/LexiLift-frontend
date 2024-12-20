type Position = 'left' | 'center' | 'right';

export interface IContent<T extends string> {
  position: Position;
  key: T;
}
