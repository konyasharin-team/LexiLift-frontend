import { DependencyList, useEffect } from 'react';
import { useDependencies } from '@hooks/useDependencies.ts';

export interface IOnSettings {
  key: string;
  on: boolean;
}

export const useOn = <T extends IOnSettings>(
  settings: T[],
  on: (settings: T[]) => void,
  extraDependencies?: DependencyList,
) => {
  const { dependencies } = useDependencies(
    settings.map(setting => ({
      ...setting,
      dependency: [setting.on],
    })),
    (element, externalElement) => element.on !== externalElement.on,
  );

  useEffect(
    () => {
      on(settings);
    },
    extraDependencies ? [...dependencies, extraDependencies] : dependencies,
  );
};
