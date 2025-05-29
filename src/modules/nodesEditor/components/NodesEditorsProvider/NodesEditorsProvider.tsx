import { createContext, FC, ReactNode } from 'react';
import { useNodesEditors } from '@modules/nodesEditor/hooks/useNodesEditors.ts';

interface INodesEditorsProviderProps {
  children?: ReactNode;
}

export const NodesEditorsContext = createContext<ReturnType<
  typeof useNodesEditors
> | null>(null);

export const NodesEditorsProvider: FC<INodesEditorsProviderProps> = props => {
  const editorsController = useNodesEditors();

  return (
    <NodesEditorsContext.Provider value={editorsController}>
      {props.children}
    </NodesEditorsContext.Provider>
  );
};
