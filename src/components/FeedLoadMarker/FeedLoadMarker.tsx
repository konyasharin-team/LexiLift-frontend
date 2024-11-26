import { FC, useEffect } from 'react';
import { Center, Loader } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { UseInfiniteQueryResult } from '@tanstack/react-query';

interface IFeedLoadMarkerProps {
  sender: UseInfiniteQueryResult;
}

export const FeedLoadMarker: FC<IFeedLoadMarkerProps> = props => {
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (
      inViewport &&
      !(props.sender.isLoading || props.sender.isFetchingNextPage)
    )
      props.sender.fetchNextPage();
  }, [inViewport, props.sender.isLoading, props.sender.isFetchingNextPage]);

  if (props.sender.isLoading || props.sender.isFetchingNextPage)
    return (
      <Center>
        <Loader ref={ref} />
      </Center>
    );
  else return <div ref={ref}></div>;
};
