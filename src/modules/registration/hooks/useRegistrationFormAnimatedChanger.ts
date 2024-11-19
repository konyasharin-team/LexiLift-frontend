import { useAnimatedChanger } from '@components/AnimatedChanger';

export const useRegistrationFormAnimatedChanger = () => {
  const { content, addToQueue } = useAnimatedChanger([
    {
      position: 'center',
      key: 'REGISTRATION_FORM',
    },
    {
      position: 'right',
      key: 'REGISTRATION_LOADING',
    },
    {
      position: 'right',
      key: 'REGISTRATION_SUCCESS',
    },
  ]);

  const onSuccessRegistration = () => {
    addToQueue([
      { key: 'REGISTRATION_LOADING', position: 'left' },
      { key: 'REGISTRATION_SUCCESS', position: 'center' },
    ]);
  };

  const onErrorRegistration = () => {
    addToQueue([
      { key: 'REGISTRATION_LOADING', position: 'right' },
      { key: 'REGISTRATION_FORM', position: 'center' },
    ]);
  };

  const onPendingRegistration = () => {
    addToQueue([
      { key: 'REGISTRATION_LOADING', position: 'center' },
      { key: 'REGISTRATION_FORM', position: 'left' },
    ]);
  };

  return {
    onErrorRegistration,
    onSuccessRegistration,
    onPendingRegistration,
    content,
  };
};
