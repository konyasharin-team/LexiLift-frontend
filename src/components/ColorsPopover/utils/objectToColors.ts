import { z } from 'zod';

export const objectToColors = <T>(
  object: Record<string, T>,
  keyColor?: keyof T,
) => {
  const colorsSchema = z.array(z.string());

  return colorsSchema.parse(
    Object.values(object).map(value => {
      if (keyColor) return value[keyColor];
      else return value;
    }),
  );
};
