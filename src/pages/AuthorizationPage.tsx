import { FC } from 'react';
import { AuthorizationForm } from '@modules/authorization';
import { useLoginController } from '@modules/authorization/hooks/useLoginController.ts';

export const AuthorizationPage: FC = () => {
  return (
    <AuthorizationForm loginController={useLoginController().loginController} />
  );
};
