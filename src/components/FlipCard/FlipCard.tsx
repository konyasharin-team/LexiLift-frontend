import { ComponentProps, FC } from 'react';
import { IDictionaryItem } from '@app-types';
import { CardSideHeadButton } from '@components/FlipCard/components/CardSideHeadButton/CardSideHeadButton.tsx';
import { IconPhoto } from '@tabler/icons-react';
import clsx from 'clsx';

import { CardSide } from './components/CardSide/CardSide.tsx';

import styles from './FlipCard.module.css';

export type FlipCardSide = 'front' | 'back';

interface IFlipCard extends ComponentProps<'div'>, Omit<IDictionaryItem, 'id'> {
  activeSide: FlipCardSide;
  imgIsVisible: boolean;
  setImgIsVisible: (newVisible: boolean) => void;
  translationImg?: string;
}

export const FlipCard: FC<IFlipCard> = ({
  word,
  translation,
  activeSide,
  translationImg,
  className,
  imgIsVisible,
  setImgIsVisible,
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
      <CardSide
        text={translation}
        side={'back'}
        headContent={
          translationImg ? (
            <CardSideHeadButton onClick={() => setImgIsVisible(!imgIsVisible)}>
              <IconPhoto size={36} />
            </CardSideHeadButton>
          ) : undefined
        }
        img={
          translationImg
            ? { url: translationImg, isVisible: imgIsVisible }
            : undefined
        }
      />
    </div>
  );
};
