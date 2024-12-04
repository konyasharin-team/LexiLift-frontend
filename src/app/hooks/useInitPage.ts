import { useEffect } from 'react';
import { useWhoAmIController } from '@modules/authorization';

export const useInitPage = () => {
  useWhoAmIController();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
