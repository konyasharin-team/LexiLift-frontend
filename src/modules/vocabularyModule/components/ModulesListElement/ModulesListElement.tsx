import { forwardRef, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '@components/List';
import { Badge, Flex, Text } from '@mantine/core';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { generators } from '@routes';

interface IModulesListElement extends ModuleSchemaInfer {
  index: number;
  withinChoose?: boolean;
  controls?: ReactNode[];
}

export const ModulesListElement = forwardRef<
  HTMLDivElement,
  IModulesListElement
>((props, ref) => {
  const navigate = useNavigate();
  return (
    <ListItem
      ref={ref}
      index={props.index}
      onSelect={
        props.withinChoose
          ? undefined
          : () => navigate(generators.MODULES_GENERATORS.MODULE(props.id))
      }
    >
      <Flex direction={'column'} justify={'space-between'} h={'100%'}>
        <div>
          <Text size="lg">{props.title}</Text>
          <Text size="sm" mt="xs">
            {props.description}
          </Text>
        </div>
        <Flex gap="xs">
          {props.tags.map((tagInfo, idx) => (
            <Badge
              key={idx}
              c={tagInfo.fontColor}
              bg={tagInfo.backgroundColor}
              variant="light"
            >
              {tagInfo.tag}
            </Badge>
          ))}
        </Flex>
      </Flex>
      <Flex pos={'absolute'} right={15} top={0} gap={5} align={'center'}>
        {props.controls}
      </Flex>
    </ListItem>
  );
});
