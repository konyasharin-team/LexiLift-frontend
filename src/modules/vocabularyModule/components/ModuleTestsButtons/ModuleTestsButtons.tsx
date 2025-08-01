import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Text } from '@mantine/core';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { appPaths, generators } from '@routes';
import { IconBooks, IconLayoutDashboardFilled } from '@tabler/icons-react';

interface IModuleTestButton {
  icon: ReactNode;
  path?: string;
  text: string;
}

const ICON_SIZE = 24;

const ModuleTestButton: FC<IModuleTestButton> = props => {
  return (
    <Button
      component={props.path ? Link : undefined}
      disabled={!props.path}
      to={props.path ?? appPaths.MODULES}
      size={'xl'}
      fullWidth={true}
      pl={15}
      styles={{ inner: { justifyContent: 'start' } }}
    >
      <Flex w={'100%'} gap={10}>
        {props.icon}
        <Text fw={500} fz={18}>
          {props.text}
        </Text>
      </Flex>
    </Button>
  );
};

export const ModuleTestsButtons: FC<Pick<ModuleSchemaInfer, 'id'>> = props => {
  return (
    <Flex direction={'column'} w={250} gap={10}>
      <ModuleTestButton
        icon={<IconLayoutDashboardFilled size={ICON_SIZE} />}
        path={generators.MODULES_GENERATORS.MATCH_TEST_SETTINGS(props.id)}
        text={'Сопоставление'}
      />
      <ModuleTestButton
        icon={<IconBooks size={ICON_SIZE} />}
        path={generators.MODULES_GENERATORS.LEARN_TEST_SETTINGS(props.id)}
        text={'Изучение'}
      />
    </Flex>
  );
};
