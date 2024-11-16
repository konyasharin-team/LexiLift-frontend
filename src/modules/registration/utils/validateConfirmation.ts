interface IConfirmationValues {
  expectedCode: string;
}

export const validateCode = (values: IConfirmationValues) => {
  const errors: Partial<IConfirmationValues> = {};

  if (!values.expectedCode) {
    errors.expectedCode = 'Поле кода обязательно для заполнения';
  } else if (values.expectedCode !== '1234') {
    errors.expectedCode = 'Неверный код подтверждения';
  }

  return errors;
};
