import { FC, ReactNode, useState } from 'react';
import { MatchTestStartModal } from '@modules/matchTest/components/MatchTestStartModal/MatchTestStartModal.tsx';
import clsx from 'clsx';

import styles from './MatchTestWrapper.module.css';

interface IMatchTestWrapperProps {
  blurIsActive: boolean;
  start: () => void;
  children?: ReactNode;
}

export const MatchTestWrapper: FC<IMatchTestWrapperProps> = props => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  return (
    <>
      <div
        className={clsx(
          styles.wrapper,
          props.blurIsActive ? styles.blurActive : styles.blurDisabled,
        )}
      >
        {props.children}
      </div>
      <MatchTestStartModal
        start={props.start}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </>
  );
};
