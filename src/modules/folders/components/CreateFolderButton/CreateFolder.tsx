import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { appPaths } from '@routes';

export const CreateFolderButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      radius="md"
      size="md"
      color="blue"
      mt={20}
      onClick={() => navigate(appPaths.FOLDERS_CREATE)}
    >
      Создать папку
    </Button>
  );
};
