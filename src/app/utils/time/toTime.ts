import { ITime } from '@app-types/ITime.ts';

export const toTime = (time: Partial<ITime>): ITime => {
  const ms =
    (time.milliseconds ?? 0) +
    (time.seconds ? time.seconds * 1000 : 0) +
    (time.minutes ? time.minutes * 1000 * 60 : 0);

  const milliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 1000 / 60);

  return {
    milliseconds,
    seconds,
    minutes,
  };
};
