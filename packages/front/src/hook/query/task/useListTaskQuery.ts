import { useContext } from 'react';
import { ApiContext } from '@/hook/api/ApiContext';
import { useQueryWithSuspense, UseQueryWithSuspenseResult } from '@/hook/query/useQueryWithSuspense';
import { Task } from '@/dto/Task';

type Arg = {
  readonly projectId: string;
  readonly columnId?: string;
  readonly enabled: boolean;
};

export const useListTaskQuery: (args: Arg) => UseQueryWithSuspenseResult<ReadonlyArray<Task>> = ({
                                                                                                   projectId,
                                                                                                   columnId,
                                                                                                   enabled
                                                                                                 }) => {
  const { api } = useContext(ApiContext);

  const query = () => {
    return api.getProjectsProjectIdTasks({ projectId, columnId })
      .then((e) => e.tasks ?? []);
  };

  return useQueryWithSuspense<ReadonlyArray<Task>>('listTask', query, enabled);
};
