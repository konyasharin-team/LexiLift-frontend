import { FC, useEffect } from 'react';
import { useInViewport } from '@mantine/hooks';

interface IFeedLoadMarkerProps {
  onView: () => void;
  disabled?: boolean;
}

export const FeedLoadMarker: FC<IFeedLoadMarkerProps> = props => {
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport && !props.disabled) props.onView();
  }, [inViewport, props.disabled]);

  return <div ref={ref}></div>;
};
