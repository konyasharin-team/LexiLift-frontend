import { FC } from 'react';
import { Viewport, ViewportContent } from '@modules/nodesEditor';

export const CourseEditorPage: FC = () => {
  return (
    <Viewport name={'test'}>
      <ViewportContent />
    </Viewport>
  );
};
