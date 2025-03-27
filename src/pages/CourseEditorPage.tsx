import { FC } from 'react';
import { Editor, EditorProvider } from '@modules/nodesEditor';
import { ReactFlowProvider } from '@xyflow/react';

export const CourseEditorPage: FC = () => {
  return (
    <ReactFlowProvider>
      <EditorProvider>
        <Editor />
      </EditorProvider>
    </ReactFlowProvider>
  );
};
