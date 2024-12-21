import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';

export const useHasCards = () => {
  const { cards } = useAppSelector(state => state.matchTest);
  const navigate = useNavigate();

  useEffect(() => {
    if (cards.length === 0) navigate(appPaths.MODULES);
  }, []);
};
