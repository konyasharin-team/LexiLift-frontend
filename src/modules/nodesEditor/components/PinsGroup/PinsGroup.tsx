import { forwardRef } from 'react';
import { Flex, FlexProps } from '@mantine/core';
import {
  BASE_NODE_HEIGHT,
  PIN_SIZE,
  PINS_GAP,
  PINS_PADDING,
  TRANSITION_BUTTON_SIZE,
} from '@modules/nodesEditor';
import { Pin } from '@modules/nodesEditor/components/Pin';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';
import { getIsHaveTransition } from '@modules/nodesEditor/utils/getIsHaveTransition.ts';
import { sortPins } from '@modules/nodesEditor/utils/sortPins.ts';
import { Position } from '@xyflow/react';
import { Property } from 'csstype';

interface IPinsGroupProps extends FlexProps {
  pins: IPin[];
  position: Position.Right | Position.Left;
  withStartPadding?: boolean;
}

export const PinsGroup = forwardRef<HTMLDivElement, IPinsGroupProps>(
  ({ position, pins, withStartPadding, ...attributes }, ref) => {
    const absolutePosition =
      position === Position.Left
        ? {
            left: PINS_PADDING,
          }
        : { right: PINS_PADDING };
    const isSinglePin = pins.length <= 1;
    const isHaveTransition = getIsHaveTransition(pins);

    const getJustify = (): Property.JustifyContent => {
      if (isHaveTransition || withStartPadding) return 'start';
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
        mih={Math.max(pins.length * (PIN_SIZE + PINS_GAP), BASE_NODE_HEIGHT)}
        {...absolutePosition}
        {...attributes}
      >
        {withStartPadding && (
          <div
            style={{
              height: TRANSITION_BUTTON_SIZE,
              width: TRANSITION_BUTTON_SIZE,
            }}
          />
        )}
        {pins.sort(sortPins).map(pin => (
          <Pin
            variant={pin.type}
            id={pin.id}
            type={position === Position.Left ? 'target' : 'source'}
            position={position}
            key={pin.id}
            color={pin.color}
          />
        ))}
      </Flex>
    );
  },
);
