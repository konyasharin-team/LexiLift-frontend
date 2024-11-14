import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '@components/AppLayout';
import { Center, Flex } from '@mantine/core';
import {
  MatchTestResultsButtonGroup,
  MatchTestResultsCard,
} from '@modules/matchTest';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';

export const MatchTestResultsPage: FC = () => {
  const { results } = useAppSelector(state => state.matchTest);

  if (!results) return <Navigate to={appPaths.MATCH_TEST_SETTINGS} />;
  return (
    <AppLayout>
      <Center>
        <Flex direction="column" gap={10} w={'60%'}>
          <MatchTestResultsCard {...results} />
          <MatchTestResultsButtonGroup />
        </Flex>
      </Center>
    </AppLayout>
  );
};
