import { useNavigate } from 'react-router-dom';
import { IdSchema, useRequestEvents } from '@api';
import { idMiddleware, useParsedParams } from '@hooks';
import { TestType, useTestSettingsBuilder } from '@modules/sharedTest';
import {
  moduleFromBackendFieldsTransform,
  useGetModuleAboutController,
} from '@modules/vocabularyModule';
import { appPaths } from '@routes';

import { useTestSettingsForm } from './useTestSettingsForm';

export const useTestSettings = (testType: TestType) => {
  const builder = useTestSettingsBuilder(testType);
  const parsedParams = useParsedParams(IdSchema, idMiddleware);
  const getModuleApiController = useGetModuleAboutController(parsedParams);
  const navigate = useNavigate();
  const formController = useTestSettingsForm(builder?.setSettingsAction, {
    onValuesChange: builder?.onValuesChange,
  });

  useRequestEvents(getModuleApiController.sender, {
    onSuccess: result => {
      if (result) {
        formController.form.setValues(
          builder.createSettings(
            moduleFromBackendFieldsTransform(result).words,
          ),
        );
        builder.setModuleAction({
          ...result,
          ...moduleFromBackendFieldsTransform(result),
        });
      } else navigate(appPaths.MODULES);
    },
  });

  return {
    getModuleApiController,
    formController,
  };
};
