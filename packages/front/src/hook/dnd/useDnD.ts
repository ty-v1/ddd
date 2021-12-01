import { useState } from 'react';
import Immutable from 'immutable';
import { DnDContextProps } from '@/hook/dnd/DnDContext';

type ImmutableMultiMap<T> = Immutable.Map<string, Immutable.List<T>>;

type Props<T> = {
  readonly initialData: ImmutableMultiMap<T>
}

/**
 * Drag & Dropを使うためのhook
 */
export const useDnD: <T>(props: Props<T>) => DnDContextProps<T> = <T>(props: Props<T>) => {
  const [groupToItems, setGroupToItems] = useState(props.initialData);
  const [dragItemIndex, setDragItemIndex] = useState<number | undefined>(undefined);
  const [dragItemGroup, setDragItemGroup] = useState<string | undefined>(undefined);

  const onDragStart = (group: string, index: number) => {
    setDragItemGroup(group);
    setDragItemIndex(index);
  };

  const onDragEnd = () => {
    setDragItemGroup(undefined);
    setDragItemIndex(undefined);
  };

  const move = (to: number) => {
    if (dragItemGroup === undefined || dragItemIndex === undefined) {
      return;
    }

    const groupItems = groupToItems.get(dragItemGroup);
    const source = groupItems?.get(dragItemIndex);
    const destination = groupItems?.get(to);

    if (groupItems === undefined || source === undefined || destination === undefined) {
      return;
    }

    const swappedGroupItems = groupItems.set(to, source)
      .set(dragItemIndex, destination);

    setGroupToItems(groupToItems.set(dragItemGroup, swappedGroupItems));
    setDragItemIndex(to);
  };

  const add = (group: string) => {
    if (dragItemGroup === undefined || dragItemIndex === undefined) {
      return;
    }

    const item = groupToItems.get(dragItemGroup)
      ?.get(dragItemIndex);
    const source = groupToItems.get(dragItemGroup);
    const destination = groupToItems.get(group);

    if (item === undefined || source === undefined || destination === undefined) {
      return;
    }

    const newGroupItems = groupToItems.set(group, destination.push(item))
      .set(dragItemGroup, source.remove(dragItemIndex));
    setGroupToItems(newGroupItems);

    // 更新前のサイズ = 現在のindex
    setDragItemIndex(destination.size);
    setDragItemGroup(group);
  };

  return {
    dragItemGroup,
    dragItemIndex,
    move,
    add,
    onDragStart,
    onDragEnd,
    groupToItems
  };
};
