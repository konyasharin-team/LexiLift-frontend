import { useContext, useEffect } from 'react';
// import { ICoordinates } from '@app-types';
import {
  NodesEditorSchemaInfer,
  NodesEditorsContext,
} from '@modules/nodesEditor';

export const useViewport = (name: NodesEditorSchemaInfer['name']) => {
  const context = useContext(NodesEditorsContext);
  // const [viewportPosition, setViewportPosition] = useState<ICoordinates>({
  //   x: 0,
  //   y: 0,
  // });

  useEffect(() => {
    context?.addEditor({
      id: 0,
      name,
    });
  }, []);

  const onDrag = () => {};

  return {
    onDrag,
  };
};
