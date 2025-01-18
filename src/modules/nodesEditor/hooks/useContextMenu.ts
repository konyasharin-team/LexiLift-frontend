import { MouseEvent, useEffect, useState } from 'react';
import { ICoordinates } from '@app-types';
import { useForm } from '@mantine/form';
import { useClickOutside } from '@mantine/hooks';
import { NODES } from '@modules/nodesEditor/constants.ts';
import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';

export const useContextMenu = () => {
  const [foundNodes, setFoundNodes] = useState<INodeInfo[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinates] = useState<ICoordinates>({ x: 0, y: 0 });
  const ref = useClickOutside(
    () => setIsActive(false),
    ['mousedown', 'touchstart'],
  );
  const form = useForm({
    initialValues: {
      searchString: '',
      isShowUnavailable: false,
    },
  });

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setIsActive(true);
    setCoordinates({ x: e.clientX, y: e.clientY });
    form.setFieldValue('searchString', '');
  };

  useEffect(() => {
    setFoundNodes(
      form.values.searchString !== ''
        ? NODES.filter(node => node.title.includes(form.values.searchString))
        : NODES,
    );
  }, [form.values.searchString]);

  return {
    isActive,
    setIsActive,
    coordinates,
    ref,
    onContextMenu,
    form,
    foundNodes,
  };
};
