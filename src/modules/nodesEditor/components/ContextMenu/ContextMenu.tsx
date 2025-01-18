import { forwardRef, useContext } from 'react';
import { ICoordinates } from '@app-types';
import { useI18N } from '@i18n';
import {
  Box,
  BoxProps,
  Center,
  Divider,
  ScrollArea,
  Text,
  TextInput,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { EditorContext } from '@modules/nodesEditor';
import { ContextMenuItem } from '@modules/nodesEditor/components/ContextMenuItem';
import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';

interface IContextMenuProps extends BoxProps {
  isActive: boolean;
  coordinates: ICoordinates;
  items: Pick<INodeInfo, 'title'>[];
}

export const ContextMenu = forwardRef<HTMLDivElement, IContextMenuProps>(
  ({ coordinates, isActive, items, ...attributes }, ref) => {
    const context = useContext(EditorContext);
    const theme = useMantineTheme();
    const { t } = useI18N();

    if (!context) return undefined;
    return (
      <Transition mounted={isActive}>
        {styles => (
          <Box
            pos={'absolute'}
            top={coordinates.y}
            left={coordinates.x}
            ref={ref}
            bg={theme.white}
            w={400}
            h={250}
            pl={'md'}
            pt={'md'}
            style={{
              ...styles,
              borderRadius: theme.radius.sm,
            }}
            {...attributes}
          >
            <TextInput
              mr={'md'}
              mb={'xs'}
              placeholder={t.courseEditorPage.inputNodeName}
              autoFocus={true}
              {...context.contextMenu.form.getInputProps('searchString')}
            />
            <ScrollArea
              scrollbars={'y'}
              type={'always'}
              offsetScrollbars={true}
              h={'80%'}
            >
              {items.length > 0 ? (
                items.map((item, i) => (
                  <>
                    {i !== 0 ? <Divider /> : undefined}
                    <ContextMenuItem {...item} key={i} />
                  </>
                ))
              ) : (
                <Center>
                  <Text c={'gray'}>{t.courseEditorPage.nodesNotFound}</Text>
                </Center>
              )}
              {}
            </ScrollArea>
          </Box>
        )}
      </Transition>
    );
  },
);
