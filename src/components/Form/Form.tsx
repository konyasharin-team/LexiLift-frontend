import { FormEventHandler, forwardRef, ReactNode } from 'react';
import {
  FormWrapper,
  IFormWrapperProps,
} from '@components/Form/components/FormWrapper/FormWrapper.tsx';
import { Flex, Title } from '@mantine/core';
import { LinkItem } from '@ui/Link/LinkItem.tsx';

interface IFormProps extends Omit<IFormWrapperProps, 'children'> {
  onSubmit: FormEventHandler<HTMLFormElement>;
  title?: string;
  children?: ReactNode;
  link?: {
    text: string;
    href: string;
  };
  withWrapper?: boolean;
}

export const Form = forwardRef<HTMLDivElement, IFormProps>(
  ({ title, onSubmit, children, link, fullWidth, withWrapper = true }, ref) => {
    const getWrapperContent = (isHasRef: boolean) => (
      <div ref={isHasRef ? ref : undefined} style={{ width: '100%' }}>
        {title ? (
          <Flex justify="center">
            <Title order={2} mb="md">
              {title}
            </Title>
          </Flex>
        ) : undefined}
        <form onSubmit={onSubmit}>{children}</form>
        {link ? <LinkItem to={link.href} label={link.text} /> : undefined}
      </div>
    );
    return (
      <div style={{ width: '100%' }}>
        {withWrapper ? (
          <FormWrapper fullWidth={fullWidth} ref={ref}>
            {getWrapperContent(false)}
          </FormWrapper>
        ) : (
          getWrapperContent(true)
        )}
      </div>
    );
  },
);
