export interface IUseTimerReturn {
  seconds: number;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  active: boolean;
}
