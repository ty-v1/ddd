export type Paging<T> = {
  readonly total: number;
  readonly records: ReadonlyArray<T>;
};
