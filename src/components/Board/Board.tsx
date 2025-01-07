import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IBoardItem } from '@components/Board/types/IBoardItem.ts';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { mergeRefs } from '@mantine/hooks';
import clsx from 'clsx';

import stylesBase from './Board.module.css';

interface IBoardProps<T extends IBoardItem> extends Props {
  items: T[];
  activeItemToReactNode?: (item: T | undefined) => ReactNode | null;
  className?: string;
  styles?: CSSProperties;
  children?: ReactNode;
}

const BoardInner = <T extends IBoardItem>(
  {
    items,
    activeItemToReactNode,
    className,
    styles,
    children,
    onDragEnd,
    ...attributes
  }: IBoardProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
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

  const onDragEndHandle = (e: DragEndEvent) => {
    setActiveId(null);
    if ((!e.delta.x && !e.delta.y) || !containerRect) return;
    if (onDragEnd) onDragEnd(e);
  };

  const getDragOverlayNode = (): ReactNode | null => {
    if (activeId && activeItemToReactNode) {
      const item = items.find(item => item.id === activeId);
      return activeItemToReactNode(item);
    }
    return null;
  };

  return (
    <div
      ref={mergeRefs(containerRef, ref)}
      className={clsx(stylesBase.board, className)}
      style={{
        ...styles,
      }}
    >
      <DndContext
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={onDragEndHandle}
        autoScroll={false}
        modifiers={[restrictToWindowEdges]}
        {...attributes}
      >
        {children}
        {activeItemToReactNode ? (
          <DragOverlay dropAnimation={{ duration: 200 }}>
            {getDragOverlayNode()}
          </DragOverlay>
        ) : undefined}
      </DndContext>
    </div>
  );
};

export const Board = forwardRef(BoardInner) as <T extends IBoardItem>(
  props: IBoardProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof BoardInner>;
