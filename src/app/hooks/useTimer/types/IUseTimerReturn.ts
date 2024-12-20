export interface IUseTimerReturn {
  milliseconds: number;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  active: boolean;
}
