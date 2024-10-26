export const updateByValue = <T, P extends keyof T>(
  array: T[],
  key: keyof T,
  value: P,
  findCallback: (element: T) => T,
  notFindCallback?: () => T,
) => {
  if (array.findIndex(element => element[key] === value) !== -1) {
    return array.map(element => {
      if (element[key] === value) return findCallback(element);
      return element;
    });
  }

  if (notFindCallback) return [...array, notFindCallback()];
  return array;
};
