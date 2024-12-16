import { ComponentProps, FC } from 'react';
import { DictionaryItemSchemaInfer } from '@app-types';
import { CardSide } from '@modules/vocabularyModule/components/CardSide/CardSide.tsx';
import { CardSideHeadButton } from '@modules/vocabularyModule/components/CardSideHeadButton/CardSideHeadButton.tsx';
import { IconPhoto } from '@tabler/icons-react';
import clsx from 'clsx';

import styles from './FlipCard.module.css';

export type FlipCardSide = 'front' | 'back';

interface IFlipCard
  extends ComponentProps<'div'>,
    Omit<DictionaryItemSchemaInfer, 'id'> {
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
