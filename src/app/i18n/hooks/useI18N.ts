import { useContext } from 'react';
import { I18NContextBase, LanguagesAbbrSchemaInfer } from '@i18n';

export const useI18N = <
  T extends LanguagesAbbrSchemaInfer = LanguagesAbbrSchemaInfer,
>() => {
  const i18n = useContext(I18NContextBase);

  const setLanguageHandle = (newLanguageAbbr: T) => {
    if (i18n) i18n.setLanguage(newLanguageAbbr);
    else throw new Error('I18N did not initialize');
  };

  const getLanguage = () => {
    if (i18n) return i18n.language;
    else throw new Error('I18N did not initialize');
  };

  return {
    setLanguage: setLanguageHandle,
    language: getLanguage(),
    t: getLanguage().resource,
  };
};
