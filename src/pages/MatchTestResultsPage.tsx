import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { Center, Flex } from '@mantine/core';
import {
  MatchTestResultsButtonGroup,
  MatchTestResultsCard,
} from '@modules/matchTest';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';
import { MARGIN_TOP_BASE } from '@constants';

export const MatchTestResultsPage: FC = () => {
  const { results } = useAppSelector(state => state.matchTest);

  if (!results) return <Navigate to={appPaths.MATCH_TEST_SETTINGS} />;
  return (
    <Center mt={MARGIN_TOP_BASE}>
      <Flex direction="column" gap={10} w={'60%'}>
        <MatchTestResultsCard {...results} />
        <MatchTestResultsButtonGroup />
      </Flex>
    </Center>
  );
};
