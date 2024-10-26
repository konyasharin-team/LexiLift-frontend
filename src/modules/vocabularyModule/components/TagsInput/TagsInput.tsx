import * as React from 'react';
import { useCombobox } from '@mantine/core';
import { CheckIcon, Combobox, Group, Pill, PillsInput } from '@mantine/core';

import { ISelectedTag, ITag } from '../../hooks/useTags.ts';

interface TagsInputProps {
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  search: string;
  setSearch: (value: string) => void;
  filteredOptions: ISelectedTag[];
  handleAddTag: (label: string) => void;
  handleRemoveTag: (tag: ITag) => void;
}

const TagsInput = ({
  tags,
  setTags,
  search,
  setSearch,
  filteredOptions,
  handleAddTag,
  handleRemoveTag,
}: TagsInputProps) => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const combobox = useCombobox({
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    if (val && !tags.some(tag => tag.label === val)) {
      setTags(current => [...current, { label: val, color: getRandomColor() }]);
    }
  };

  const values = tags.map(item => (
    <Pill
      key={item.label}
      bg={item.color}
      withRemoveButton
      onRemove={() => handleRemoveTag(item)}
    >
      {item.label}
    </Pill>
  ));

  const options = filteredOptions.map(item => (
    <Combobox.Option value={item.label} key={item.label}>
      <Group gap="sm">
        {item.selected ? <CheckIcon size={12} /> : null}
        <span>{item.label}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput mt={15} onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                value={search}
                placeholder="Введите теги"
                onChange={event => setSearch(event.currentTarget.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAddTag(e.currentTarget.value);
                  if (e.key === 'Backspace' && search.length === 0) {
                    e.preventDefault();
                    handleRemoveTag(tags[tags.length - 1]);
                  }
                }}
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

export default TagsInput;
