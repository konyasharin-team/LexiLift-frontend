import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@components/AppLayout';
import { MatchTestResultsCard } from '@modules/matchTest';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';
import { Center } from '@mantine/core';

export const MatchTestResultsPage: FC = () => {
  const { results } = useAppSelector(state => state.matchTest);
  const navigate = useNavigate();

  useEffect(() => {
    if (!results) navigate(appPaths.MATCH_TEST_SETTINGS);
  }, []);

  if (!results) return;
  return (
    <AppLayout>
      <Center>
        <MatchTestResultsCard {...results} />
      </Center>
    </AppLayout>
  );
};
