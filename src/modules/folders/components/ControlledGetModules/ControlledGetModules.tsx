import { DependencyList, FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { ControlledChildren } from '@app-types';
import { ControlledComponent } from '@components/ControlledComponent';
import { useI18N } from '@i18n';
import {
  FOLDERS_ERRORS,
  useGetFolderModulesController,
} from '@modules/folders';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';
import { getControlledChildren } from '@utils';

interface IControlledGetModulesProps {
  controller: ReturnType<typeof useGetFolderModulesController>;
  children: ControlledChildren<ModuleSchemaInfer[]>;
  dependencies?: DependencyList;
}

export const ControlledGetModules: FC<IControlledGetModulesProps> = props => {
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
