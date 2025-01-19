import { forwardRef } from 'react';
import { Flex, FlexProps } from '@mantine/core';
import {
  BASE_NODE_HEIGHT,
  PIN_SIZE,
  PINS_GAP,
  PINS_PADDING,
} from '@modules/nodesEditor';
import { Pin } from '@modules/nodesEditor/components/Pin';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { sortPins } from '@modules/nodesEditor/utils/sortPins.ts';
import { Position } from '@xyflow/react';
import { Property } from 'csstype';

interface IPinsGroupProps extends FlexProps {
  nodeId: string;
  pins: IPin[];
  position: Position.Right | Position.Left;
}

export const PinsGroup = forwardRef<HTMLDivElement, IPinsGroupProps>(
  ({ position, pins, nodeId, ...attributes }, ref) => {
    const absolutePosition =
      position === Position.Left
        ? {
            left: PINS_PADDING,
          }
        : { right: PINS_PADDING };
    const isSinglePin = pins.length <= 1;
    const isHaveTransition = !!pins.find(pin => pin.type === 'transition');

    const getJustify = (): Property.JustifyContent => {
      if (isHaveTransition) return 'start';
      if (isSinglePin) return 'center';
      return 'space-evenly';
    };

    return (
      <Flex
        ref={ref}
        justify={getJustify()}
        pos={'absolute'}
        top={0}
        direction={'column'}
        gap={PINS_GAP}
        pt={getJustify() === 'start' ? PINS_GAP : 0}
        pb={getJustify() === 'start' ? PINS_GAP : 0}
        h={Math.max(pins.length * (PIN_SIZE + PINS_GAP), BASE_NODE_HEIGHT)}
        {...absolutePosition}
        {...attributes}
      >
        {pins.sort(sortPins).map((pin, i) => (
          <Pin
            variant={pin.type}
            id={`${position === Position.Left ? 'in' : 'out'}-${nodeId}-${i}`}
            type={position === Position.Left ? 'target' : 'source'}
            position={position}
            key={i}
            color={pin.color}
          />
        ))}
      </Flex>
    );
  },
);
