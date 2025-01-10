import { FC, useState } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { ColorsPopover, objectToColors } from '@components/ColorsPopover';
import { ControlledComponent } from '@components/ControlledComponent';
import { useI18N } from '@i18n';
import {
  ActionIcon,
  CheckIcon,
  Combobox,
  Flex,
  Group,
  Pill,
  PillsInput,
  PillsInputProps,
  Text,
  useCombobox,
} from '@mantine/core';
import {
  BASE_TAG_COLOR,
  TagColors,
  TagSchemaInfer,
  TagsColors,
  useGetTagsController,
} from '@modules/tags';
import { IconCheck } from '@tabler/icons-react';

const CURRENT_COLOR_KEY: keyof TagColors = 'fontColor';

interface ITagsInputProps extends PillsInputProps {
  addTag: (tag: TagSchemaInfer) => void;
  removeTag: (tag: TagSchemaInfer['tag']) => void;
  tags: TagSchemaInfer[];
}

export const TagsInput: FC<ITagsInputProps> = ({
  addTag,
  removeTag,
  tags,
  ...attributes
}) => {
  const controller = useGetTagsController();
  const { t } = useI18N();
  const [currentColor, setCurrentColor] = useState(BASE_TAG_COLOR);
  const [search, setSearch] = useState('');

  const getUserTags = () => {
    return controller.sender.response?.data.result?.map(tag => ({
      tag,
      selected: false,
    }));
  };

  const combobox = useCombobox({
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    if (val) {
      setSearch(val);
      setSearch(getUserTags()?.find(tagObj => tagObj.tag === val)?.tag ?? '');
    }
  };

  const values = tags.map(item => (
    <Pill
      key={item.tag}
      bg={item.backgroundColor}
      withRemoveButton
      onRemove={() => removeTag(item.tag)}
      h={'fit-content'}
    >
      <Text c={item.fontColor}>{item.tag}</Text>
    </Pill>
  ));

  const options = getUserTags()
    ?.filter(tagObj => {
      const isAlreadyChose = tags.some(
        otherTagObj => otherTagObj.tag === tagObj.tag,
      );
      if (search.length === 0) {
        return !isAlreadyChose;
      } else {
        return !isAlreadyChose && tagObj.tag.startsWith(search);
      }
    })
    .map(tagObj => (
      <Combobox.Option value={tagObj.tag} key={tagObj.tag}>
        <Group gap="sm">
          {tagObj.selected ? <CheckIcon size={12} /> : null}
          <span>{tagObj.tag}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput
          mt={15}
          onClick={() => combobox.openDropdown()}
          styles={theme => ({
            section: {
              width: 'fit-content',
              padding: theme.spacing.xs,
            },
          })}
          rightSection={
            <Flex gap={5}>
              <ActionIcon
                display={search.length === 0 ? 'none' : 'block'}
                disabled={tags.some(tagObj => tagObj.tag === search)}
                onClick={() => {
                  addTag({ tag: search, ...currentColor });
                  setSearch('');
                }}
              >
                <IconCheck size={18} />
              </ActionIcon>
              <ColorsPopover
                colors={objectToColors(TagsColors, CURRENT_COLOR_KEY)}
                currentColor={currentColor[CURRENT_COLOR_KEY]}
                setCurrentColor={color =>
                  setCurrentColor(
                    Object.values(TagsColors).find(
                      tag => tag[CURRENT_COLOR_KEY] === color,
                    ) ?? BASE_TAG_COLOR,
                  )
                }
              />
            </Flex>
          }
          {...attributes}
        >
          <Pill.Group>
            {values}
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={t.createModulePage.inputTags}
                onChange={event => setSearch(event.currentTarget.value)}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <ControlledComponent
          {...controller.sender}
          error={getErrorTextWithEmpty()}
        >
          {result =>
            result && options?.length ? (
              <Combobox.Options>{options}</Combobox.Options>
            ) : (
              <Combobox.Empty>
                {t.createModulePage.tagsNotFound}...
              </Combobox.Empty>
            )
          }
        </ControlledComponent>
      </Combobox.Dropdown>
    </Combobox>
  );
};
