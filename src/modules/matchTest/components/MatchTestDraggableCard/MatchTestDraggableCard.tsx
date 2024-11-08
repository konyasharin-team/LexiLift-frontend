import { FC, useEffect, useState } from 'react';
import { MatchTestCard } from '@modules/matchTest/components/MatchTestCard/MatchTestCard.tsx';
import {
  MATCH_CARD_ANIMATIONS_DURATION_SECONDS,
  MATCH_CARD_HIDE_ITERATIONS,
  MATCH_CARD_PAINT_ITERATIONS,
  MATCH_CARD_SHAKE_ITERATIONS,
} from '@modules/matchTest/constants.ts';
import { useMatchTestDraggableCard } from '@modules/matchTest/hooks/useMatchTestDraggableCard.ts';
import { IDraggableMatchTestCard } from '@modules/matchTest/types/IDraggableMatchTestCard.ts';
import { IMatchTestAnimation } from '@modules/matchTest/types/IMatchTestAnimation.ts';

import styles from './MatchTestDraggableCard.module.css';

interface IMatchTestDraggableCardProps extends IDraggableMatchTestCard {
  isDisabled: boolean;
  animation?: IMatchTestAnimation;
}

export const MatchTestDraggableCard: FC<
  IMatchTestDraggableCardProps
> = props => {
  const [className, setClassName] = useState<string | null>(null);
  const { style, ...attributes } = useMatchTestDraggableCard(
    {
      id: props.id,
      coordinates: props.coordinates,
    },
    props.isDisabled,
    props.type,
  );

  useEffect(() => {
    if (props.animation) setClassName(styles[props.animation.type]);
    else setClassName(null);
  }, [props.animation]);

  return (
    <MatchTestCard
      style={{
        ...style,
        animationDuration: `${MATCH_CARD_ANIMATIONS_DURATION_SECONDS / MATCH_CARD_PAINT_ITERATIONS}s,
                            ${
                              props.animation?.type === 'error'
                                ? MATCH_CARD_ANIMATIONS_DURATION_SECONDS /
                                  MATCH_CARD_SHAKE_ITERATIONS
                                : MATCH_CARD_ANIMATIONS_DURATION_SECONDS /
                                  MATCH_CARD_HIDE_ITERATIONS
                            }s`,
        animationIterationCount: `${MATCH_CARD_PAINT_ITERATIONS}, ${props.animation?.type === 'error' ? MATCH_CARD_SHAKE_ITERATIONS : MATCH_CARD_HIDE_ITERATIONS}`,
      }}
      className={className ?? undefined}
      {...attributes}
    >
      {props.value}
    </MatchTestCard>
  );
};
