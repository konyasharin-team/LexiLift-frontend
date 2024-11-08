import { useEffect, useState } from 'react';
import { useTest } from '@hooks';
import { IDraggableMatchTestCard } from '@modules/matchTest/types/IDraggableMatchTestCard.ts';
import { IUseMatchTestItemsWrapperReturn } from '@modules/matchTest/types/IUseMatchTestItemsWrapperReturn.ts';

export const useMatchTestItemsWrapper = (
  params: Parameters<typeof useTest>,
): IUseMatchTestItemsWrapperReturn => {
  const test = useTest(params[0], params[1]);
  const [wrappedItems, setWrappedItems] = useState<IDraggableMatchTestCard[]>(
    test.items,
  );

  const setWrappedItemsHandle = (
    newWrappedItems: IDraggableMatchTestCard[],
  ) => {
    setWrappedItems(newWrappedItems);
    test.setItems(newWrappedItems);
  };

  useEffect(() => {
    let areEquals = true;
    if (wrappedItems.length !== test.items.length) areEquals = false;
    if (areEquals) {
      for (let i = 0; i < wrappedItems.length; i++) {
        if (test.items.some(item => item.id === wrappedItems[i].id)) {
          areEquals = false;
          break;
        }
      }
    }
    if (!areEquals) setWrappedItemsHandle(test.items);
  }, [test.items]);

  return {
    ...test,
    items: wrappedItems,
    setItems: setWrappedItemsHandle,
  };
};
