import { useContext } from 'react';
import { ApiContext } from '@/hook/api/ApiContext';
import { useQueryWithSuspense, UseQueryWithSuspenseResult } from '@/hook/query/useQueryWithSuspense';
import { Column } from '@/dto/Column';

type Arg = {
  readonly projectId: string;
};

export const useListColumnQuery: (arg: Arg) => UseQueryWithSuspenseResult<ReadonlyArray<Column>> = ({ projectId }) => {
  const { api } = useContext(ApiContext);

  const query = () => {
    return api.getProjectsProjectIdColumns({ projectId })
      .then(({ columns }) => columns ?? []);
  };

  return useQueryWithSuspense<ReadonlyArray<Column>>('listColumn', query);
};
