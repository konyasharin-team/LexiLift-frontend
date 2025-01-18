import { createContext, FC, ReactNode } from 'react';
import { useEditor } from '@modules/nodesEditor';

interface IEditorProviderProps {
  children?: ReactNode;
}

export const EditorContext = createContext<ReturnType<typeof useEditor> | null>(
  null,
);

export const EditorProvider: FC<IEditorProviderProps> = props => {
  const editor = useEditor();
  return (
    <EditorContext.Provider value={editor}>
      {props.children}
    </EditorContext.Provider>
  );
};
