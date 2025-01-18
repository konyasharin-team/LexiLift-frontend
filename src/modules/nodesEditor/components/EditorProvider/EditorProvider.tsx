import { createContext, FC, ReactNode } from 'react';
import { useContextMenu, useEditor } from '@modules/nodesEditor';

interface IEditorProviderProps {
  children?: ReactNode;
}

interface IEditorContext {
  editor: ReturnType<typeof useEditor>;
  contextMenu: ReturnType<typeof useContextMenu>;
}

export const EditorContext = createContext<IEditorContext | null>(null);

export const EditorProvider: FC<IEditorProviderProps> = props => {
  const contextMenu = useContextMenu();
  const editor = useEditor({
    onMouseClosableInteract: () => {
      contextMenu.setIsActive(false);
      contextMenu.form.setFieldValue('searchString', '');
    },
  });

  return (
    <EditorContext.Provider value={{ editor, contextMenu }}>
      {props.children}
    </EditorContext.Provider>
  );
};
