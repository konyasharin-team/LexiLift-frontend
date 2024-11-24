import { FC } from 'react';
import { AuthorizationForm } from '@modules/authorization';
import { useAuthorizationRequests } from '@modules/authorization/hooks/useAuthorizationRequests.ts';

export const AuthorizationPage: FC = () => {
  return (
    <AuthorizationForm
      loginController={useAuthorizationRequests().loginController}
    />
  );
};
