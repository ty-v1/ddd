import { useContext } from 'react';
import { ApiContext } from '@/hook/api/ApiContext';
import { useQueryWithSuspense, UseQueryWithSuspenseResult } from '@/hook/query/useQueryWithSuspense';
import { fromResponse, Task } from '@/dto/Task';

type Args = {
  readonly projectId: string;
};

export type TaskFilteringResult = {
  readonly tasks: ReadonlyArray<Task>;
  readonly total: number;
  readonly todoCount: number;
  readonly doingCount: number;
  readonly doneCount: number;
};

export const useListTaskQuery: (args: Args) => UseQueryWithSuspenseResult<TaskFilteringResult> = ({
                                                                                             projectId,
                                                                                           }) => {
  const { api } = useContext(ApiContext);

  const query = () => {
    return api.getProjectsProjectIdTasks({ projectId })
      .then(({ tasks, todoCount, total, doneCount, doingCount }) => {
        return {
          total,
          doneCount,
          doingCount,
          todoCount,
          tasks: tasks?.map((e) => fromResponse(e)) ?? [],
        };
      });
  };

  return useQueryWithSuspense<TaskFilteringResult>('listTask', query);
};
