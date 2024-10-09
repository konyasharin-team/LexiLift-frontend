import { FC, useRef } from 'react';
import { useBoardDraggableItem } from '@components/Board';
import { useDroppable } from '@dnd-kit/core';
import { mergeRefs } from '@mantine/hooks';
import {
  MATCH_CARD_SHAKE_DURATION_SECONDS,
  MATCH_CARD_SHAKE_ITERATIONS_COUNT,
} from '@modules/MatchTest/components/DraggableMatchTestCard/constants.ts';
import { MatchTestCard } from '@modules/MatchTest/components/MatchTestCard/MatchTestCard.tsx';
import { IDraggableMatchTestCard } from '@modules/MatchTest/types/IDraggableMatchTestCard.ts';
import { useAppSelector } from '@store/hooks';
import clsx from 'clsx';

import shakeStyles from '@styles/shake.module.css';
import {
  isAnswerFromThisCard
} from '@modules/MatchTest/utils/isAnswerFromThisCard.ts';

export const DraggableMatchTestCard: FC<IDraggableMatchTestCard> = props => {
  const ref = useRef<HTMLElement>(null);
  const {
    ref: draggableRef,
    style,
    ...attributes
  } = useBoardDraggableItem({
    id: props.id,
    coordinates: props.coordinates,
  });
  const { setNodeRef: setDropRef } = useDroppable({
    id: props.id,
  });
  const { errors, success } = useAppSelector(state => state.matchTest);

  return (
    <MatchTestCard
      ref={mergeRefs(draggableRef, ref, setDropRef)}
      style={{
        ...style,
        animationDuration: `${MATCH_CARD_SHAKE_DURATION_SECONDS}s`,
        animationIterationCount: MATCH_CARD_SHAKE_ITERATIONS_COUNT,
      }}
      className={clsx([
        errors.find(error => isAnswerFromThisCard(error, props.id))
          ? shakeStyles.shake
          : undefined,
      ])}
      {...attributes}
    >
      {props.value}
    </MatchTestCard>
  );
};
