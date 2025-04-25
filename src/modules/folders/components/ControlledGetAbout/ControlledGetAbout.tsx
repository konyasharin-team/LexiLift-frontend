import { DependencyList, FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { ControlledChildren } from '@app-types';
import { ControlledComponent } from '@components/ControlledComponent';
import { useI18N } from '@i18n';
import {
  FOLDERS_ERRORS,
  FolderSchemaInfer,
  useGetFolderAboutController,
} from '@modules/folders';
import { getControlledChildren } from '@utils';

interface IControlledGetAboutProps {
  controller: ReturnType<typeof useGetFolderAboutController>;
  children?: ControlledChildren<FolderSchemaInfer>;
  dependencies?: DependencyList;
}

export const ControlledGetAbout: FC<IControlledGetAboutProps> = props => {
  const { t } = useI18N();

  return (
    <ControlledComponent
      {...props.controller.sender}
      error={getErrorTextWithEmpty(props.controller.apiError?.type, {
        requestErrors: FOLDERS_ERRORS(t),
      })}
      dependencies={props.dependencies}
    >
      {result => getControlledChildren(result, props.children)}
    </ControlledComponent>
  );
};
