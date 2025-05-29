import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@components/List';
import { Button, Flex, Image, Pill, Text } from '@mantine/core';
import { ProgressCircle } from '@modules/cources/components/ProgressCircle/ProgressCircle.tsx';
import { ICourse } from '@modules/cources/types/ICourse.ts';
import { generators } from '@routes';
import { appColors } from '@themes';

interface ICourseListProps
  extends Pick<ICourse, 'img' | 'progress' | 'name' | 'description' | 'tags'> {
  index: number;
}

const levelColors: Record<string, string> = {
  A1: '#FFDDC1',
  A2: '#FFE4B5',
  B1: '#FFD700',
  B2: '#FFA500',
  C1: '#fb612a',
  C2: '#f43b19',
};

export const CourseListElement = forwardRef<HTMLDivElement, ICourseListProps>(
  (props, ref) => {
    const getTagColor = (tag: string) =>
      levelColors[tag] || appColors.greyApp[3];

    return (
      <ListItem ref={ref} index={props.index}>
        <Flex justify="space-between">
          <Image src={props.img} fit="contain" w={64} h={64} radius="md" />
          <ProgressCircle progress={props.progress} />
        </Flex>
        <Text
          fz={24}
          fw={700}
          tt="uppercase"
          mt={20}
          style={{ whiteSpace: 'nowrap' }}
        >
          {props.name}
        </Text>
        <Text
          fz={14}
          fw={300}
          c={appColors.greyApp[6]}
          ta="justify"
          style={{ wordBreak: 'break-word' }}
        >
          {props.description}
        </Text>
        <Flex mt="sm" wrap="wrap" justify="space-between">
          <Flex gap="xs">
            {props.tags.map((tag, index) => (
              <Pill
                key={index}
                style={{
                  backgroundColor: getTagColor(tag),
                  color: 'white',
                }}
              >
                {tag}
              </Pill>
            ))}
          </Flex>
          <Link to={generators.COURSES_GENERATORS.COURSE(1)}>
            <Button size="compact-sm">Тестовый курс</Button>
          </Link>
        </Flex>
      </ListItem>
    );
  },
);
