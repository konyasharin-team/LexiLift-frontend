import { useNavigate } from 'react-router-dom';
import { Button, Flex } from '@mantine/core';
import { appPaths } from '@routes';

export const MatchTestResultsButtonGroup = () => {
  const navigate = useNavigate();
  return (
    <Flex align={'center'} gap={10} w={'100%'} justify={'end'}>
      <Button disabled={true}>К модулю</Button>
      <Button onClick={() => navigate(appPaths.MATCH_TEST_SETTINGS)}>
        Настройки теста
      </Button>
      <Button onClick={() => navigate(appPaths.MATCH_TEST)}>
        Начать заново
      </Button>
    </Flex>
  );
};
