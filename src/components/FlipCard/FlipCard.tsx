import { ComponentProps, FC, useState } from 'react';
import { CardSideHeadButton } from '@components/FlipCard/components/CardSideHeadButton/CardSideHeadButton.tsx';
import { IconPhoto } from '@tabler/icons-react';
import clsx from 'clsx';

import { CardSide } from './components/CardSide/CardSide.tsx';

import styles from './FlipCard.module.css';

export type FlipCardSide = 'front' | 'back';

interface IFlipCard extends ComponentProps<'div'> {
  word: string;
  translation: string;
  activeSide: FlipCardSide;
  translationImg?: string;
}

export const FlipCard: FC<IFlipCard> = ({
  word,
  translation,
  activeSide,
  translationImg,
  className,
  ...attributes
}) => {
  const [imgIsVisible, setImgIsVisible] = useState(false);

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
          <CardSideHeadButton onClick={() => setImgIsVisible(!imgIsVisible)}>
            <IconPhoto size={24} />
          </CardSideHeadButton>
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
