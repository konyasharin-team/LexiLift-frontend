import { Resource } from '@i18n';

const en: Resource = {
  languages: {
    ru: 'Russian',
    en: 'English',
  },
  authorizationPage: {
    authorization: 'Authorization',
    toRegistration: 'Do not have an account? Register!',
    emailLabel: 'Email',
    emailPlaceholder: 'Your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Your password',
    loginButton: 'Login',
  },
  registrationPage: {
    registration: 'Registration',
    toLogin: 'Do you already have an account?',
    emailLabel: 'Email',
    emailPlaceholder: 'Your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Your password',
    repeatPasswordLabel: 'Repeat of your password',
    repeatPasswordPlaceholder: 'Repeat password',
    registerButton: 'Register',
    successfulRegistration: 'Registration was successful!',
  },
  profilePage: {
    successfulChangingPassword: 'Password successfully changed',
    oldPasswordPlaceholder: 'Your old password',
    newPasswordPlaceholder: 'Your new password',
    savePassword: 'Save password',
  },
  avatarButton: {
    profile: 'Profile',
    exit: 'Exit',
  },
  authorizationErrors: {
    invalidEmail: 'Invalid format of email',
    invalidPassword: 'Invalid format of password',
    emailAlreadyExist: 'User with this email already exists',
    invalidNewPassword: 'Invalid format of new password',
    badOldPassword: 'Invalid old password',
    oldAndNewPasswordsAreEqual: 'Old and new passwords should not be equal',
  },
  navigation: {
    compareTest: 'Comparing test (developing)',
    folders: 'Folders (developing)',
    modules: 'Modules (developing)',
    courses: 'Courses (developing)',
    test: 'For testing',
    login: 'Login',
    achievements: 'Achievements (developing)',
  },
  createModulePage: {
    createModule: 'Create module',
    moduleName: 'Module name',
    inputTags: 'Input tags',
    description: 'Description',
    word: 'Word',
    translation: 'Translation',
    addCard: 'Add card',
  },
  achievementsPage: {
    yourAchievements: 'Your achievements',
  },
};

export default en;
