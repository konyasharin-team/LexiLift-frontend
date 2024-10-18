import { useState } from 'react';
import { IUseTimerReturn } from '@hooks/useTimer/types/IUseTimerReturn.ts';
import { useInterval } from '@mantine/hooks';

export const useTimer = (): IUseTimerReturn => {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds(seconds + 1), 1000);

  return {
    seconds,
    ...interval,
  };
};
