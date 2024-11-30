import { DependencyList, useEffect, useState } from 'react';

interface IUseDependenciesElement {
  dependency: DependencyList;
  key: string;
}

export const useDependencies = <T extends IUseDependenciesElement>(
  externalDependencies: T[],
  condition: (element: T, externalElement: T) => boolean,
) => {
  const [dependencies, setDependencies] = useState<T[]>(externalDependencies);

  const getByKey = (array: T[], key: string) => {
    return array.find(element => element.key === key);
  };

  useEffect(() => {
    setDependencies(prevState => {
      if (
        prevState.length === externalDependencies.length &&
        prevState.every(element => {
          const elementInExternal = getByKey(externalDependencies, element.key);
          if (elementInExternal) return true;
          else {
            console.error('External keys must be equals every render');
            return false;
          }
        }) &&
        prevState.some(element => {
          const elementInExternal = getByKey(externalDependencies, element.key);
          if (elementInExternal) return condition(element, elementInExternal);
        })
      )
        return [...externalDependencies];
      if (prevState.length !== externalDependencies.length)
        console.error(
          'External dependencies array length must be equals every render',
        );
      return prevState;
    });
  }, [externalDependencies]);

  return {
    dependencies,
  };
};
