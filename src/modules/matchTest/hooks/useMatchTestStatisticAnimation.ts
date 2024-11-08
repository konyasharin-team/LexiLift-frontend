import { useEffect, useMemo } from 'react';
import { MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS } from '@modules/matchTest/constants.ts';
import { useSpring } from '@react-spring/web';

export const useMatchTestStatisticAnimation = () => {
  const settings: Parameters<typeof useSpring>[0] = useMemo(
    () => ({
      from: { scale: 1 },
      to: [{ scale: 1.05 }, { scale: 1 }],
      config: {
        duration: MATCH_TEST_STATISTIC_ANIMATION_DURATION_SECONDS * 1000,
      },
    }),
    [],
  );
  const [styles, api] = useSpring(() => settings);

  useEffect(() => {
    api.stop();
  }, []);

  return {
    styles,
    api,
    settings,
  };
};
