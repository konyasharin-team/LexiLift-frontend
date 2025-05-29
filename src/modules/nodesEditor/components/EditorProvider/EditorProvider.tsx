import { createContext, FC, ReactNode } from 'react';
import { NodesEditorInfoSchemaInfer } from '@modules/nodesEditor';
import { useEditor } from '@modules/nodesEditor/hooks/useEditor.ts';

interface IEditorProviderProps
  extends Pick<NodesEditorInfoSchemaInfer, 'name'> {
  children?: ReactNode;
}

export const EditorContext = createContext<ReturnType<typeof useEditor> | null>(
  null,
);

export const EditorProvider: FC<IEditorProviderProps> = props => {
  const viewportController = useEditor(props.name);

  return (
    <EditorContext.Provider value={viewportController}>
      {props.children}
    </EditorContext.Provider>
  );
};
