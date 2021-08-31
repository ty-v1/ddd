import { Set } from 'typescript-collections';

export const createSet = <T>(array: Array<T>) => {
  const set = new Set<T>();
  for (const e of array) {
    set.add(e);
  }

  return set;
};
