import { FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { AlertGroup, useAlertGroup } from '@components/Alert';
import { Center } from '@components/Center';
import { AuthorizationForm, useLoginController } from '@modules/authorization';

export const AuthorizationPage: FC = () => {
  const controller = useLoginController();
  const alertGroupController = useAlertGroup(
    [
      {
        type: 'error',
        text: getErrorTextWithEmpty(controller.apiError?.type, {
          replacedBaseError: 'Неверный логин или пароль',
        }),
        on: !!controller.apiError,
      },
    ],
    {
      attributes: {
        delay: 0.05,
      },
    },
  );

  return (
    <Center deltaY={100}>
      <AlertGroup {...alertGroupController.attributes}>
        <AuthorizationForm loginController={controller} />
      </AlertGroup>
    </Center>
  );
};
