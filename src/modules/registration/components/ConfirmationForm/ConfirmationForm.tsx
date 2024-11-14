import { FC, useState } from 'react';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PinInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { appPaths } from '@routes';

import { validateCode } from '../ValidateRegistration/validateConfirmation.ts';

interface IConfirmationFormProps {
  onSuccess?: () => void;
}

export const ConfirmationForm: FC<IConfirmationFormProps> = props => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      expectedCode: '',
    },
    validate: validateCode,
  });

  const handleCodeSubmit = async (values: typeof form.values) => {
    setLoading(true);
    if (values.expectedCode === '1234') {
      props.onSuccess?.();
      notifications.show({
        title: 'Успех',
        message: 'Аккаунт подтверждён!',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Ошибка',
        message: 'Неверный код',
        color: 'red',
      });
    }
    setLoading(false);
  };

  return (
    <Form
      title={'Заголовок'}
      isLoading={loading}
      onSubmit={form.onSubmit(handleCodeSubmit)}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <Flex justify="center">
        <Text>Мы выслали код на ваш email</Text>
      </Flex>
      <Flex justify="center">
        <PinInput
          length={4}
          ariaLabel="Введите код"
          {...form.getInputProps('expectedCode')}
          mt="md"
        />
      </Flex>
      <Flex justify="center">
        <Button
          type="submit"
          mt="xl"
          w={200}
          radius="md"
          color="blue"
          disabled={loading}
        >
          Подтвердить код
        </Button>
      </Flex>
    </Form>
  );
};
