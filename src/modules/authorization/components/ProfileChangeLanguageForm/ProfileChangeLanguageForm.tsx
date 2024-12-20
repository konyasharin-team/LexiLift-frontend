import { FC, useState } from 'react';
import { FormWrapper } from '@components/Form';
import { LanguagesAbbrSchema, useI18N } from '@i18n';
import { ComboboxItem, Select } from '@mantine/core';
import { getSelectLanguageData } from '@modules/authorization';

export const ProfileChangeLanguageForm: FC = () => {
  const { language, setLanguage, t } = useI18N();
  const [value, setValue] = useState<ComboboxItem>({
    label: t.languages[language.abbr],
    value: language.abbr,
  });

  return (
    <FormWrapper fullWidth={true}>
      <Select
        withCheckIcon={false}
        allowDeselect={false}
        data={getSelectLanguageData(t)}
        value={value ? value.value : null}
        onChange={(value, option) => {
          if (value) {
            setLanguage(LanguagesAbbrSchema.parse(value));
            setValue(option);
          }
        }}
      />
    </FormWrapper>
  );
};
