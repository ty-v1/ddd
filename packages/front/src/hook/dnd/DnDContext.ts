import { createContext, useContext } from 'react';
import Immutable from 'immutable';
import { once } from 'lodash';

export type DnDContextProps<T> = {
  readonly dragItemIndex?: number;
  readonly dragItemGroup?: string;
  readonly add: (group: string) => void;
  readonly move: (to: number) => void;
  readonly onDragStart: (group: string, index: number) => void;
  readonly onDragEnd: () => void;
  readonly groupToItems: Immutable.Map<string, Immutable.List<T>>;
};

export const createDnDContext = once(<T>() => createContext<DnDContextProps<T>>({
  dragItemGroup: undefined,
  dragItemIndex: undefined,
  onDragStart: () => {
    return;
  },
  onDragEnd: () => {
    return;
  },
  add: () => {
    return;
  },
  move: () => {
    return;
  },
  groupToItems: Immutable.Map()
}));

export const useDnDContext: <T>() => DnDContextProps<T> = <T>() => useContext(createDnDContext<T>());
