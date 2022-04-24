import { useQuery, QueryFunction, QueryKey, UseQueryResult } from 'react-query';

type RequireData<T extends { data: unknown }> = T & {
  data: NonNullable<T['data']>;
};

export type UseQueryWithSuspenseResult<T> = RequireData<UseQueryResult<T, unknown>>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useQueryWithSuspense = <T extends unknown>(
  queryKey: QueryKey,
  fetcher: QueryFunction<T>,
  enabled = true,
): UseQueryWithSuspenseResult<T> => {
  return useQuery(queryKey, fetcher, { suspense: true, enabled }) as any;
};
