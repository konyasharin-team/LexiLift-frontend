import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from '@mantine/core';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';
import { appPaths, generators } from '@routes';

export const MatchTestResultsButtonGroup: FC<
  Pick<ModuleSchemaInfer, 'id'>
> = props => {
  const navigate = useNavigate();
  return (
    <Flex align={'center'} gap={10} w={'100%'} justify={'end'}>
      <Button
        onClick={() => navigate(generators.MODULES_GENERATORS.MODULE(props.id))}
      >
        К модулю
      </Button>
      <Button
        onClick={() =>
          navigate(generators.MODULES_GENERATORS.MATCH_TEST_SETTINGS(props.id))
        }
      >
        Настройки теста
      </Button>
      <Button onClick={() => navigate(appPaths.MATCH_TEST)}>
        Начать заново
      </Button>
    </Flex>
  );
};
