import { FC } from 'react';
import { GridCol, Image, Paper, Text } from '@mantine/core';
import { ILesson } from '@modules/cources/types/ILesson.ts';
import { appColors } from '@themes';

export const CourseLessonsListElement: FC<ILesson> = props => {
  return (
    <GridCol span={3}>
      <Paper p={'md'} shadow={'sm'} h={250}>
        <Image src={props.img} fit="contain" w={64} h={64} radius={'md'} />
        <Text fz={24} fw={700} tt={'uppercase'} mt={20}>
          {props.name}
        </Text>
        <Text fz={14} fw={300} c={appColors.greyApp[6]} ta={'justify'}>
          {props.description}
        </Text>
      </Paper>
    </GridCol>
  );
};
