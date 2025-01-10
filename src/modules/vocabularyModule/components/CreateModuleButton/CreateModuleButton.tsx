import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { appPaths } from '@routes';

export const CreateModuleButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      radius="md"
      size="md"
      color="blue"
      pos={'sticky'}
      top={70}
      style={{
        zIndex: 1,
      }}
      onClick={() => navigate(appPaths.MODULES_CREATE)}
    >
      Создать модуль
    </Button>
  );
};
