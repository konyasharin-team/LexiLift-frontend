import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRequestData, useRequestEvents } from '@api';
import { Center } from '@components/Center';
import { Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { appPaths } from '@routes';

interface IControlledComponentProps<TResult, TError>
  extends IRequestData<TResult, TError> {
  error: string;
  children: (result?: TResult) => ReactNode;
}

export const ControlledComponent = <TResult, TError>(
  props: IControlledComponentProps<TResult, TError>,
) => {
  const navigate = useNavigate();
  const [content, setContent] = useState<ReactNode>();

  useRequestEvents(props, {
    onSuccess: result => setContent(props.children(result)),
    onLoading: () =>
      setContent(
        <Center>
          <Loader />
        </Center>,
      ),
    onError: () => {
      setContent(undefined);
      showNotification({
        message: props.error,
        color: 'red',
      });
      navigate(appPaths.MODULES);
    },
  });

  return content;
};
