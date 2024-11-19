import { FC } from 'react';
import {
  Button,
  Flex,
  GridCol,
  Image,
  Paper,
  ScrollArea,
  Text,
} from '@mantine/core';
import { ICourse } from '@modules/cources/types/ICourse.ts';
import { ILesson } from '@modules/cources/types/ILesson.ts';
import { IconCheck, IconLock, IconPlayerPlayFilled } from '@tabler/icons-react';
import { appColors } from '@themes';

interface ICourseLessonsListProps extends ILesson, Pick<ICourse, 'progress'> {
  index: number;
}

export const CourseLessonsListElement: FC<ICourseLessonsListProps> = props => {
  const getPlayButtonByProgress = () => {
    if (props.index < props.progress)
      return (
        <Button w={64} h={64} bg={'green'}>
          <IconCheck size={32} />
        </Button>
      );
    else if (props.index === props.progress)
      return (
        <Button w={64} h={64}>
          <IconPlayerPlayFilled size={32} />
        </Button>
      );
    else
      return (
        <Button w={64} h={64} disabled={true}>
          <IconLock size={32} />
        </Button>
      );
  };

  return (
    <GridCol span={3}>
      <Paper p={'md'} shadow={'sm'} h={250}>
        <Flex justify={'space-between'}>
          <Image src={props.img} fit="contain" w={64} h={64} radius={'md'} />
          {getPlayButtonByProgress()}
        </Flex>
        <ScrollArea scrollbarSize={8} scrollbars={'x'} w={'100%'}>
          <Text
            fz={24}
            fw={700}
            tt={'uppercase'}
            mt={20}
            style={{ whiteSpace: 'nowrap' }}
          >
            {props.name}
          </Text>
        </ScrollArea>
        <ScrollArea.Autosize
          type={'always'}
          offsetScrollbars={true}
          scrollbarSize={8}
          scrollbars={'y'}
          mah={95}
        >
          <Text fz={14} fw={300} c={appColors.greyApp[6]} ta={'justify'}>
            {props.description}
          </Text>
        </ScrollArea.Autosize>
      </Paper>
    </GridCol>
  );
};
