export const generateKeys = <T>(array: T[]) => {
  return array.map((element, i) => ({ ...element, key: i.toString() }));
};
