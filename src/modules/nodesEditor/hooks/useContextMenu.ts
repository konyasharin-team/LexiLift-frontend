import { MouseEvent, useEffect, useState } from 'react';
import { ICoordinates } from '@app-types';
import { useInContainer } from '@hooks';
import { useForm } from '@mantine/form';
import { useClickOutside } from '@mantine/hooks';
import { NODES } from '@modules/nodesEditor/constants.ts';
import { INodeInfo } from '@modules/nodesEditor/types/INodeInfo.ts';
import { IPin } from '@modules/nodesEditor/types/IPin.ts';

export const useContextMenu = () => {
  const [foundNodes, setFoundNodes] = useState<INodeInfo<Omit<IPin, 'id'>>[]>(
    [],
  );
  const [isActive, setIsActive] = useState(false);
  const inContainer = useInContainer();
  const ref = useClickOutside<HTMLDivElement>(
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
    let newCoordinates: ICoordinates = {
      x: e.clientX,
      y: e.clientY,
    };
    if (
      newCoordinates.x + (ref.current?.getBoundingClientRect().width ?? 0) >
      window.innerWidth
    )
      newCoordinates = { ...newCoordinates, x: window.innerWidth };
    inContainer.setCoordinates(newCoordinates);
    form.setFieldValue('searchString', '');
  };

  useEffect(() => {
    setFoundNodes(
      form.values.searchString !== ''
        ? Object.values(NODES).filter(node =>
            node.title.includes(form.values.searchString),
          )
        : Object.values(NODES),
    );
  }, [form.values.searchString]);

  return {
    isActive,
    setIsActive,
    ref,
    onContextMenu,
    form,
    foundNodes,
    inContainer,
  };
};
