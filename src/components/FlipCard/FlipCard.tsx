import { ComponentProps, FC } from 'react';
import clsx from 'clsx';

import { CardSide, ICardSide } from './components/CardSide/CardSide.tsx';

import styles from './FlipCard.module.css';

export type FlipCardSide = 'front' | 'back';

interface IFlipCard extends Pick<ICardSide, 'img'>, ComponentProps<'div'> {
  word: string;
  translation: string;
  activeSide: FlipCardSide;
}

export const FlipCard: FC<IFlipCard> = ({
  word,
  translation,
  activeSide,
  img,
  className,
  ...attributes
}) => {
  return (
    <div
      className={clsx(
        className,
        styles.card,
        activeSide === 'front' ? styles.card_active : styles.card_disable,
      )}
      {...attributes}
    >
      <CardSide text={word} side={'front'} />
      <CardSide text={translation} side={'back'} />
    </div>
  );
};
