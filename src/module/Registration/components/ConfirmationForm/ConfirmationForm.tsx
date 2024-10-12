import { Button, Flex, PinInput, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface IConfirmationFormProps {
  form: UseFormReturnType<{ expectedCode: string }>;
  onSubmit: (values: { expectedCode: string }) => Promise<void>;
  loading: boolean;
}

export function ConfirmationForm({
  form,
  onSubmit,
  loading,
}: IConfirmationFormProps) {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
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
    </form>
  );
}
