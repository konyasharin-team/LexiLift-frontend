import { useRef, useState } from 'react';
import { ICoordinates } from '@app-types';

export const useInContainer = (initialCoordinates?: ICoordinates) => {
  const [coordinates, setCoordinates] = useState<ICoordinates>(
    initialCoordinates ?? {
      x: 0,
      y: 0,
    },
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const setCoordinatesHandle = (newCoordinates: ICoordinates) => {
    if (containerRef.current && elementRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();
      if (containerRect.right < newCoordinates.x + elementRect.width)
        newCoordinates = {
          ...newCoordinates,
          x: containerRect.right - elementRect.width,
        };
      if (containerRect.bottom < newCoordinates.y + elementRect.height)
        newCoordinates = {
          ...newCoordinates,
          y: containerRect.bottom - elementRect.height,
        };
    }
    setCoordinates(newCoordinates);
  };

  return {
    setCoordinates: setCoordinatesHandle,
    coordinates,
    containerRef,
    elementRef,
  };
};
