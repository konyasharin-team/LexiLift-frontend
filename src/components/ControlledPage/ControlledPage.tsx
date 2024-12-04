import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRequestData, useRequestEvents } from '@api';
import { CenterPage } from '@components/CenterPage';
import { Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { appPaths } from '@routes';

interface IControlledPageProps<TResult, TError>
  extends IRequestData<TResult, TError> {
  error: string;
  children: (result?: TResult) => ReactNode;
}

export const ControlledPage = <TResult, TError>(
  props: IControlledPageProps<TResult, TError>,
) => {
  const navigate = useNavigate();
  const [content, setContent] = useState<ReactNode>();

  useRequestEvents(props, {
    onSuccess: result => setContent(props.children(result)),
    onLoading: () =>
      setContent(
        <CenterPage>
          <Loader />
        </CenterPage>,
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
