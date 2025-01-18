import { forwardRef, useContext } from 'react';
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
import { mergeRefs } from '@mantine/hooks';
import { EditorContext } from '@modules/nodesEditor';
import { ContextMenuItem } from '@modules/nodesEditor/components/ContextMenuItem';

export const ContextMenu = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    const context = useContext(EditorContext);
    const theme = useMantineTheme();
    const { t } = useI18N();

    if (!context) return undefined;
    return (
      <Transition mounted={context.contextMenu.isActive}>
        {styles => (
          <Box
            pos={'absolute'}
            top={context.contextMenu.inContainer.coordinates.y}
            left={context.contextMenu.inContainer.coordinates.x}
            ref={mergeRefs(ref, context.contextMenu.inContainer.elementRef)}
            bg={theme.white}
            w={400}
            h={250}
            pl={'md'}
            pt={'md'}
            style={{
              ...styles,
              borderRadius: theme.radius.sm,
            }}
            {...props}
          >
            <TextInput
              mr={'md'}
              mb={'xs'}
              placeholder={t.editorPage.inputNodeName}
              autoFocus={true}
              {...context.contextMenu.form.getInputProps('searchString')}
            />
            <ScrollArea
              scrollbars={'y'}
              type={'always'}
              offsetScrollbars={true}
              h={'80%'}
            >
              {context.contextMenu.foundNodes.length > 0 ? (
                context.contextMenu.foundNodes.map((item, i) => (
                  <Box key={i}>
                    {i !== 0 ? <Divider /> : undefined}
                    <ContextMenuItem {...item} />
                  </Box>
                ))
              ) : (
                <Center>
                  <Text c={'gray'}>{t.editorPage.nodesNotFound}</Text>
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
