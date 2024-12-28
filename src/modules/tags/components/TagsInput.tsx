import { FC, useState } from 'react';
import { ColorsPopover, objectToColors } from '@components/ColorsPopover';
import { useI18N } from '@i18n';
import {
  ActionIcon,
  CheckIcon,
  Combobox,
  Flex,
  Group,
  Pill,
  PillsInput,
  Text,
  useCombobox,
} from '@mantine/core';
import {
  BASE_TAG_COLOR,
  TagColors,
  TagSchemaInfer,
  TagsColors,
} from '@modules/tags';
import { tags } from '@modules/tags/data.ts';
import { IconCheck } from '@tabler/icons-react';

const CURRENT_COLOR_KEY: keyof TagColors = 'fontColor';

interface ITagsInputProps {
  addTag: (tag: TagSchemaInfer) => void;
  removeTag: (tag: TagSchemaInfer['tag']) => void;
  tags: TagSchemaInfer[];
}

export const TagsInput: FC<ITagsInputProps> = props => {
  const { t } = useI18N();
  const [currentColor, setCurrentColor] = useState(BASE_TAG_COLOR);
  const [search, setSearch] = useState('');
  const [userTags] = useState(tags.map(tag => ({ tag, selected: false })));

  const combobox = useCombobox({
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    if (val) {
      setSearch(val);
      setSearch(userTags.find(tagObj => tagObj.tag === val)?.tag ?? '');
    }
  };

  const values = props.tags.map(item => (
    <Pill
      key={item.tag}
      bg={item.backgroundColor}
      withRemoveButton
      onRemove={() => props.removeTag(item.tag)}
      h={'fit-content'}
    >
      <Text c={item.fontColor}>{item.tag}</Text>
    </Pill>
  ));

  const options = userTags
    .filter(tagObj => {
      const isAlreadyChose = props.tags.some(
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
                disabled={props.tags.some(tagObj => tagObj.tag === search)}
                onClick={() => {
                  props.addTag({ tag: search, ...currentColor });
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
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
