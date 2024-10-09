import { ForwardedRef, ReactNode, useEffect, useRef, useState } from 'react';
import { IBoardItem } from '@components/Board/types/IBoardItem.ts';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { mergeRefs } from '@mantine/hooks';

interface IBoardProps<T extends IBoardItem> {
  items: T[];
  setItems: (items: T[]) => void;
  boardRef: ForwardedRef<HTMLDivElement>;
  onDragEnd?: (e: DragEndEvent) => void;
  activeItemToReactNode?: (item: T | undefined) => ReactNode | null;
  children?: ReactNode;
}

export const Board = <T extends IBoardItem>(props: IBoardProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [activeId, setActiveId] = useState<IBoardItem['id'] | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    if ((!e.delta.x && !e.delta.y) || !containerRect) return;
    if (props.onDragEnd) props.onDragEnd(e);
  };

  const getDragOverlayNode = (): ReactNode | null => {
    if (activeId && props.activeItemToReactNode) {
      const item = props.items.find(item => item.id === activeId);
      return props.activeItemToReactNode(item);
    }
    return null;
  };

  return (
    <div
      ref={mergeRefs(containerRef, props.boardRef)}
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        border: '1px solid #000',
        overflow: 'hidden',
      }}
    >
      <DndContext
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={onDragEnd}
        autoScroll={false}
        modifiers={[restrictToWindowEdges]}
      >
        {props.children}
        {props.activeItemToReactNode ? (
          <DragOverlay>{getDragOverlayNode()}</DragOverlay>
        ) : undefined}
      </DndContext>
    </div>
  );
};
