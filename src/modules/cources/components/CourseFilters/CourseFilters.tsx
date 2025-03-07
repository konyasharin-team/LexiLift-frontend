import { useState } from 'react';
import {
  Affix,
  Button,
  Checkbox,
  Divider,
  Paper,
  Stack,
  Title,
  Transition,
} from '@mantine/core';
import { IconFilterFilled } from '@tabler/icons-react';

export const CourseFilters = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Affix position={{ right: 20, bottom: 20 }}>
      <Button onClick={() => setOpened(!opened)}>
        <IconFilterFilled />
      </Button>
      <Transition
        mounted={opened}
        transition="pop"
        duration={200}
        timingFunction="ease"
      >
        {styles => (
          <Paper
            shadow="md"
            p="md"
            withBorder
            style={{
              ...styles,
              position: 'absolute',
              bottom: '70px',
              right: '20px',
              width: '250px',
              zIndex: 1000,
            }}
          >
            <Title order={4}>Фильтры</Title>
            <Divider my="sm" label="Сложность" />
            <Stack>
              <Checkbox label="Нет фильтра" value="none" />
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                <Checkbox key={level} label={level} value={level} />
              ))}
            </Stack>
            <Divider my="sm" label="Прогресс" />
            <Stack>
              <Checkbox label="Все" value="all" />
              <Checkbox label="Не начаты" value="notStarted" />
              <Checkbox label="В процессе выполнения" value="inProgress" />
              <Checkbox label="Законченные" value="completed" />
            </Stack>
          </Paper>
        )}
      </Transition>
    </Affix>
  );
};
