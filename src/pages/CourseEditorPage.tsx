import { FC } from 'react';
import { Editor, EditorProvider } from '@modules/nodesEditor';

export const CourseEditorPage: FC = () => {
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  );
};
