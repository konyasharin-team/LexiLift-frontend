import { appPaths } from '@routes/appPaths.ts';

export const generators = {
  COURSES_GENERATORS: {
    COURSE: (id: number) => {
      return `${appPaths.COURSES}/${id}`;
    },
  },
  MODULES_GENERATORS: {
    MODULE: (id: number) => {
      return `${appPaths.MODULES}/${id}`;
    },
    MATCH_TEST_SETTINGS: (id: number) => {
      return appPaths.MATCH_TEST_SETTINGS.replace(':id', id.toString());
    },
  },
};
