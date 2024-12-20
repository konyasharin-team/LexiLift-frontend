import { LanguagesAbbrSchemaInfer, useI18N } from '@i18n';

export const getSelectLanguageData = (
  t: ReturnType<typeof useI18N>['t'],
): { value: LanguagesAbbrSchemaInfer; label: string }[] => {
  return [
    { value: 'ru', label: t.languages.ru },
    { value: 'en', label: t.languages.en },
  ];
};
