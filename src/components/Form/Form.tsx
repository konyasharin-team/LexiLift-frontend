import { FC, FormEventHandler, ReactNode } from 'react';
import { Flex, Paper, Title } from '@mantine/core';
import { LinkItem } from '@ui/Link/LinkItem.tsx';

interface IFormProps {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children?: ReactNode;
  link?: {
    text: string;
    href: string;
  };
}

export const Form: FC<IFormProps> = props => {
  return (
    <Flex justify="center">
      <Paper radius="lg" withBorder shadow="xl" p="xl" mt={120} w={700}>
        <Flex justify="center">
          <Title order={2} mb="md">
            {props.title}
          </Title>
        </Flex>
        <form onSubmit={props.onSubmit}>{props.children}</form>
        {props.link ? (
          <LinkItem to={props.link.href} label={props.link.text} />
        ) : undefined}
      </Paper>
    </Flex>
  );
};
