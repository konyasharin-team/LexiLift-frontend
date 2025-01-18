const ru = {
  languages: {
    ru: 'Русский',
    en: 'Английский',
  },
  authorizationPage: {
    authorization: 'Авторизация',
    toRegistration: 'Нет аккаунта? Зарегистрируйся!',
    emailLabel: 'Email',
    emailPlaceholder: 'Ваш email',
    passwordLabel: 'Пароль',
    passwordPlaceholder: 'Ваш пароль',
    loginButton: 'Войти',
  },
  registrationPage: {
    registration: 'Регистрация',
    toLogin: 'Уже есть аккаунт?',
    emailLabel: 'Email',
    emailPlaceholder: 'Ваш email',
    passwordLabel: 'Пароль',
    passwordPlaceholder: 'Ваш пароль',
    repeatPasswordLabel: 'Повтор вашего пароля',
    repeatPasswordPlaceholder: 'Повторите пароль',
    registerButton: 'Зарегистрироваться',
    successfulRegistration: 'Регистрация прошла успешно!',
  },
  profilePage: {
    successfulChangingPassword: 'Пароль успешно изменен',
    oldPasswordPlaceholder: 'Ваш старый пароль',
    newPasswordPlaceholder: 'Ваш новый пароль',
    savePassword: 'Сохранить пароль',
  },
  avatarButton: {
    profile: 'Профиль',
    exit: 'Выход',
  },
  authorizationErrors: {
    invalidEmail: 'Неверный формат ввода электронной почты',
    invalidPassword: 'Неверный формат ввода пароля',
    emailAlreadyExist: 'Пользователь с такой электронной почтой уже существует',
    invalidNewPassword: 'Неверный формат ввода нового пароля',
    badOldPassword: 'Неверный старый пароль',
    oldAndNewPasswordsAreEqual:
      'Старый и новый пароли не должны быть одинаковыми',
  },
  navigation: {
    compareTest: 'Тест на сопоставление (в разработке)',
    folders: 'Папки (в разработке)',
    modules: 'Модули',
    courses: 'Курсы (в разработке)',
    test: 'Для тестирования',
    login: 'Вход',
    achievements: 'Достижения (в разработке)',
  },
  createModulePage: {
    createModule: 'Создать модуль',
    editModule: 'Обновить модуль',
    moduleName: 'Название модуля',
    inputTags: 'Введите теги',
    description: 'Описание',
    word: 'Слово',
    translation: 'Перевод',
    addCard: 'Добавить карточку',
    tagsNotFound: 'Тегов не найдено',
    createdSuccess: 'Модуль успешно создан',
    updatedSuccess: 'Модуль успешно обновлен',
    wordAlreadyExistError: 'Слово уже есть в данном модуле',
    translationAlreadyExistError: 'Такой перевод уже есть в данном модуле',
  },
  modulesErrors: {
    accessDenied: 'Вам отказано в доступе к данному модулю',
    notFound: 'Модуль не найден',
  },
  modulePage: {
    wordsCount: 'Количество слов',
    deleteError: 'Не удалось удалить модуль',
    deleteSuccess: 'Модуль успешно удален',
  },
  achievementsPage: {
    yourAchievements: 'Ваши достижения',
  },
  editorPage: {
    inputNodeName: 'Введите название узла',
    showUnavailableNodes: 'Показать недоступные узлы',
    nodesNotFound: 'Узлов не найдено',
  },
};

export default ru;
