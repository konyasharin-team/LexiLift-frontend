import { FormEventHandler, forwardRef, ReactNode } from 'react';
import { FormWrapper } from '@components/Form/components/FormWrapper/FormWrapper.tsx';
import { Flex, Title } from '@mantine/core';
import { LinkItem } from '@ui/Link/LinkItem.tsx';

interface IFormProps {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children?: ReactNode;
  link?: {
    text: string;
    href: string;
  };
  withWrapper?: boolean;
}

export const Form = forwardRef<HTMLDivElement, IFormProps>(
  ({ title, onSubmit, children, link, withWrapper = true }, ref) => {
    const getWrapperContent = (isHasRef: boolean) => (
      <div ref={isHasRef ? ref : undefined}>
        <Flex justify="center">
          <Title order={2} mb="md">
            {title}
          </Title>
        </Flex>
        <form onSubmit={onSubmit}>{children}</form>
        {link ? <LinkItem to={link.href} label={link.text} /> : undefined}
      </div>
    );
    return (
      <div>
        {withWrapper ? (
          <FormWrapper ref={ref}>{getWrapperContent(false)}</FormWrapper>
        ) : (
          getWrapperContent(true)
        )}
      </div>
    );
  },
);
