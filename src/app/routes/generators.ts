import { appPaths } from '@routes/appPaths.ts';

export const generators = {
  COURSES_GENERATORS: {
    COURSE: (id: number) => {
      return `${appPaths.COURSES}/${id}`;
    },
  },
};
