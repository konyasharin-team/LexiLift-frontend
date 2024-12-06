import { FC, ReactNode } from 'react';
import { DEFAULT_LANGUAGE } from '@i18n/constants.ts';
import { createI18NContext } from '@i18n/context/createI18NContext.ts';
import { I18NContextProvider } from '@i18n/context/index.tsx';
import en from '@i18n/locales/en.ts';
import ru from '@i18n/locales/ru.ts';
import {
  LanguagesAbbrSchema,
  LanguagesAbbrSchemaInfer,
} from '@i18n/types/LanguagesAbbrSchema.ts';
import { Resource } from '@i18n/types/Resource.ts';
import { I18NService } from '@i18n/utils/I18NService.ts';

export const I18NContextBase = createI18NContext<
  LanguagesAbbrSchemaInfer,
  Resource
>();
export const I18NContextProviderBase: FC<{ children: ReactNode }> = props => {
  return (
    <I18NContextProvider<LanguagesAbbrSchemaInfer, Resource>
      settings={{
        defaultAbbr:
          I18NService.GetLanguage<LanguagesAbbrSchemaInfer>(
            LanguagesAbbrSchema,
          ) ?? DEFAULT_LANGUAGE,
        resources: {
          ru: {
            resource: ru,
          },
          en: {
            resource: en,
          },
        },
      }}
      context={I18NContextBase}
    >
      {props.children}
    </I18NContextProvider>
  );
};
