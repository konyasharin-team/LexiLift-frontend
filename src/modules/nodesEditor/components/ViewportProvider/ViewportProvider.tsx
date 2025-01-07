import { createContext, FC, ReactNode } from 'react';
import { NodesEditorInfoSchemaInfer } from '@modules/nodesEditor';
import { useViewport } from '@modules/nodesEditor/hooks/useViewport.ts';

interface IViewportProviderProps
  extends Pick<NodesEditorInfoSchemaInfer, 'name'> {
  children?: ReactNode;
}

export const ViewportContext = createContext<ReturnType<
  typeof useViewport
> | null>(null);

export const ViewportProvider: FC<IViewportProviderProps> = props => {
  const viewportController = useViewport(props.name);

  return (
    <ViewportContext.Provider value={viewportController}>
      {props.children}
    </ViewportContext.Provider>
  );
};
