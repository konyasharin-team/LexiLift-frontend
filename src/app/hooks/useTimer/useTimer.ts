import { useState } from 'react';
import { BASE_INTERVAL_MS } from '@constants';
import { IUseTimerReturn } from '@hooks/useTimer/types/IUseTimerReturn.ts';
import { useInterval } from '@mantine/hooks';

interface IUseTimerOptions {
  intervalMs?: number;
}

export const useTimer = (options?: IUseTimerOptions): IUseTimerReturn => {
  const [milliseconds, setMilliseconds] = useState(0);
  const interval = useInterval(
    () =>
      setMilliseconds(milliseconds + (options?.intervalMs ?? BASE_INTERVAL_MS)),
    options?.intervalMs ?? BASE_INTERVAL_MS,
  );

  return {
    milliseconds,
    ...interval,
  };
};
