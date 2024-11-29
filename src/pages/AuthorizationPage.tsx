import { FC, useEffect, useState } from 'react';
import { getErrorText } from '@api';
import { AlertGroup } from '@components/Alert';
import { CenterPage } from '@components/CenterPage';
import { AuthorizationForm, useLoginController } from '@modules/authorization';

export const AuthorizationPage: FC = () => {
  const [alertOpened, setAlertOpened] = useState(false);
  const controller = useLoginController();

  useEffect(() => {
    setAlertOpened(!!controller.apiError);
  }, [controller.apiError]);

  return (
    <CenterPage deltaY={100}>
      <AlertGroup
        type={'error'}
        setOpened={setAlertOpened}
        opened={alertOpened}
        durationOpen={0.1}
        durationClose={0.1}
        delay={0.05}
        text={
          controller.apiError
            ? getErrorText(controller.apiError?.type, {
                replacedBaseError: 'Неверный логин или пароль',
              })
            : undefined
        }
      >
        <AuthorizationForm loginController={controller} />
      </AlertGroup>
    </CenterPage>
  );
};
