import { FC } from 'react';
import { getResult, IdSchema } from '@api';
import { idMiddleware, useParsedParams } from '@hooks';
import {
  ControlledGetAbout,
  ControlledGetModules,
  FolderHead,
  useGetFolderAboutController,
  useGetFolderModulesController,
} from '@modules/folders';

export const FolderPage: FC = () => {
  const parsedParams = useParsedParams(IdSchema, idMiddleware);
  const getModulesController = useGetFolderModulesController(parsedParams);
  const getAboutController = useGetFolderAboutController(parsedParams);

  const getModulesResult = getResult(getModulesController.sender);
  const getAboutResult = getResult(getAboutController.sender);

  return (
    <ControlledGetModules controller={getModulesController}>
      <ControlledGetAbout controller={getAboutController}>
        {getModulesResult && getAboutResult ? (
          <div>
            <FolderHead
              modulesCount={getModulesResult.length}
              {...getAboutResult}
            />
          </div>
        ) : undefined}
      </ControlledGetAbout>
    </ControlledGetModules>
    // <ControlledComponent
    //   {...getAboutController.sender}
    //   error={getErrorTextWithEmpty(
    //     getAboutController.apiError?.type ||
    //       getModulesController.apiError?.type,
    //     {
    //       requestErrors: FOLDERS_ERRORS(t),
    //     },
    //   )}
    // >
    //   {result =>
    //     result ? (
    //       <div>
    //         <FolderHead modulesCount={3} {...result} />
    //       </div>
    //     ) : undefined
    //   }
    // </ControlledComponent>
  );
};
