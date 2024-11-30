import { FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { AlertGroup, useAlertGroup } from '@components/Alert';
import { CenterPage } from '@components/CenterPage';
import { AuthorizationForm, useLoginController } from '@modules/authorization';
import { generateKeys } from '@utils';

export const AuthorizationPage: FC = () => {
  const controller = useLoginController();
  const alertGroupController = useAlertGroup(
    generateKeys([
      {
        type: 'error',
        text: getErrorTextWithEmpty(controller.apiError?.type, {
          replacedBaseError: 'Неверный логин или пароль',
        }),
        on: !!controller.apiError,
      },
    ]),
    {
      attributes: {
        delay: 0.05,
      },
    },
  );

  return (
    <CenterPage deltaY={100}>
      <AlertGroup {...alertGroupController.attributes}>
        <AuthorizationForm loginController={controller} />
      </AlertGroup>
    </CenterPage>
  );
};
