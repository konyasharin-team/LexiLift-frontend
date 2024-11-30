import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, UnstyledButton } from '@mantine/core';
import { useLogoutController } from '@modules/authorization';
import { UserSchemaInfer } from '@modules/authorization/types/UserSchema.ts';
import { appPaths } from '@routes';
import { IconLogout2, IconUserCircle } from '@tabler/icons-react';
import { appColors } from '@themes';

interface IUserAvatarButtonProps {
  user: UserSchemaInfer | null;
}

export const UserAvatarButton: FC<IUserAvatarButtonProps> = props => {
  const controller = useLogoutController();

  return (
    <Menu
      width={200}
      offset={15}
      transitionProps={{ transition: 'fade-up', duration: 200 }}
    >
      <Menu.Target>
        <UnstyledButton>
          <Avatar name={props.user?.email} color={'initials'} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown bd={`1px solid ${appColors.greyApp[2]}`}>
        <Menu.Item
          color="blue"
          leftSection={<IconUserCircle size={20} />}
          component={Link}
          to={appPaths.PROFILE}
        >
          Профиль
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconLogout2 size={20} />}
          onClick={() => controller.sender.mutate()}
          disabled={controller.sender.isPending}
        >
          Выход
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
