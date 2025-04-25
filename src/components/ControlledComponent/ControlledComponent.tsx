import { DependencyList, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRequestData, useRequestEvents } from '@api';
import { Center } from '@components/Center';
import { Loader } from '@mantine/core';
import { appPaths } from '@routes';
import { notify } from '@utils';

interface IControlledComponentProps<TResult, TError>
  extends IRequestData<TResult, TError> {
  error: string;
  children: (result?: TResult) => ReactNode;
  dependencies?: DependencyList;
}

export const ControlledComponent = <TResult, TError>(
  props: IControlledComponentProps<TResult, TError>,
) => {
  const navigate = useNavigate();
  const [result, setResult] = useState<TResult | undefined>(undefined);
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    setContent(props.children?.(result));
  }, props.dependencies ?? []);

  useRequestEvents(props, {
    onSuccess: newResult => {
      setContent(props.children?.(newResult));
      setResult(newResult);
    },
    onLoading: () => {
      setContent(
        <Center>
          <Loader />
        </Center>,
      );
      setResult(undefined);
    },
    onError: () => {
      setContent(undefined);
      setResult(undefined);
      notify({
        type: 'error',
        message: props.error,
      });
      navigate(appPaths.MODULES);
    },
  });

  return content;
};
