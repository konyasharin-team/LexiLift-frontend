import { FC, useEffect, useState } from 'react';
import { MatchTestCard } from '@modules/MatchTest/components/MatchTestCard/MatchTestCard.tsx';
import {
  MATCH_CARD_ANIMATIONS_DURATION_SECONDS,
  MATCH_CARD_HIDE_ITERATIONS,
  MATCH_CARD_PAINT_ITERATIONS,
  MATCH_CARD_SHAKE_ITERATIONS,
} from '@modules/MatchTest/constants.ts';
import { useDraggableMatchTestCard } from '@modules/MatchTest/hooks/useDraggableMatchTestCard.ts';
import { IDraggableMatchTestCard } from '@modules/MatchTest/types/IDraggableMatchTestCard.ts';
import { IMatchTestAnimation } from '@modules/MatchTest/types/IMatchTestAnimation.ts';

import styles from './DraggableMatchTestCard.module.css';

interface IDraggableMatchTestCardProps extends IDraggableMatchTestCard {
  animation?: IMatchTestAnimation;
}

export const DraggableMatchTestCard: FC<
  IDraggableMatchTestCardProps
> = props => {
  const [className, setClassName] = useState<string | null>(null);
  const { style, ...attributes } = useDraggableMatchTestCard(
    {
      id: props.id,
      coordinates: props.coordinates,
    },
    !!className,
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
