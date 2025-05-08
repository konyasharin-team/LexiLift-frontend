import { appPaths } from '@routes/appPaths.ts';

export const generators = {
  COURSES_GENERATORS: {
    COURSE: (id: number) => {
      return `${appPaths.COURSES}/${id}`;
    },
    COURSE_EDITOR: (id: number) => {
      return appPaths.COURSE_EDITOR.replace(':id', id.toString());
    },
  },
  MODULES_GENERATORS: {
    MODULE: (id: number) => {
      return `${appPaths.MODULES}/${id}`;
    },
    MATCH_TEST_SETTINGS: (id: number) => {
      return appPaths.MATCH_TEST_SETTINGS.replace(':id', id.toString());
    },
    EDIT_MODULE: (id: number) => {
      return appPaths.MODULE_EDIT.replace(':id', id.toString());
    },
  },
  FOLDERS_GENERATORS: {
    FOLDER: (id: number) => {
      return `${appPaths.FOLDERS}/${id}`;
    },
    EDIT_FOLDER: (id: number) => {
      return appPaths.FOLDER_EDIT.replace(':id', id.toString());
    },
  },
};
