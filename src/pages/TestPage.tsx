import { FC } from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { useAuthorizationDeleteTargetController } from '@modules/authorization/hooks/useAuthorizationDeleteTargetController.ts';

export const TestPage: FC = () => {
  const { deleteLogoutTargetController } =
    useAuthorizationDeleteTargetController();

  const handleLogout = () => {
    deleteLogoutTargetController.mutate({
      refreshTokenId:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkMTc5Mzk1My03Nzc4LTQyNjYtOGZlZC00ZDkzM2Q1NWQzNDAiLCJpYXQiOjE3MzIzNDc3MTgsImV4cCI6MTczMjk1MjUxOH0.BOBbnyV2ovKSSBnrOeOaW_BN33d8aYojf6nMNxgOHJY',
    });
  };

  return (
    <div>
      <Paper p="md" shadow="xs">
        <Text size="lg" mb="md">
          Добро пожаловать на тестовую страницу!
        </Text>
        <Button color="red" onClick={handleLogout}>
          Выйти из аккаунта
        </Button>
      </Paper>
    </div>
  );
};
