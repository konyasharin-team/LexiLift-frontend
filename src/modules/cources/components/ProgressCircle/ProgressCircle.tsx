import { memo, useEffect } from 'react';
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion';

export const ProgressCircle = memo(({ progress }: { progress: number }) => {
  const progressMotionValue: MotionValue<number> = useMotionValue(0);
  const strokeDashoffset = useTransform(
    progressMotionValue,
    [0, 100],
    [220, 0],
  );

  useEffect(() => {
    animate(progressMotionValue, progress, {
      duration: 1.5,
      ease: 'easeInOut',
    });
  }, [progress, progressMotionValue]);

  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle
        cx="40"
        cy="40"
        r="35"
        stroke="lightgrey"
        strokeWidth="10"
        fill="none"
      />
      <motion.circle
        cx="40"
        cy="40"
        r="35"
        stroke="yellow"
        strokeWidth="10"
        fill="none"
        transform="rotate(-90 40 40)"
        strokeDasharray="220"
        style={{ strokeDashoffset }}
      />
      <text
        x="40"
        y="40"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontWeight="bold"
        fill="black"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
});
