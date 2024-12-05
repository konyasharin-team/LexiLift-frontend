import { Context, ReactNode, useEffect, useState } from 'react';
import {
  LanguagesAbbrSchema,
  LanguagesAbbrSchemaInfer,
} from '@i18n/types/LanguagesAbbrSchema.ts';
import { I18NService } from '@i18n/utils/I18NService.ts';

export interface ILanguage<T extends string, P> {
  abbr: T;
  resource: Readonly<P>;
}

export interface II18NContext<T extends string, P> {
  language: ILanguage<T, P>;
  setLanguage: (newLanguageAbbr: T) => void;
}

export interface II18NSettings<T extends string, P> {
  defaultAbbr: T;
  resources: Readonly<Record<T, Omit<ILanguage<T, P>, 'abbr'>>>;
}

interface II18NContextProviderProps<T extends string, P> {
  context: Context<II18NContext<T, P> | null>;
  settings: II18NSettings<T, P>;
  children?: ReactNode;
}

export const I18NContextProvider = <T extends string, P>(
  props: II18NContextProviderProps<T, P>,
) => {
  const [language, setLanguage] = useState<ILanguage<T, P>>({
    ...props.settings.resources[props.settings.defaultAbbr],
    abbr: props.settings.defaultAbbr,
  });

  useEffect(() => {
    if (
      I18NService.GetLanguage<LanguagesAbbrSchemaInfer>(LanguagesAbbrSchema) ===
      null
    )
      I18NService.SetLanguage(language.abbr);
  }, []);

  const setLanguageHandle = (newLanguageAbbr: T) => {
    setLanguage({
      ...props.settings.resources[newLanguageAbbr],
      abbr: newLanguageAbbr,
    });
    I18NService.SetLanguage(newLanguageAbbr);
  };

  const Context = props.context;

  return (
    <Context.Provider
      value={{
        language,
        setLanguage: setLanguageHandle,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
