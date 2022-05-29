import { useContext } from 'react';
import { ApiContext } from '@/hook/api/ApiContext';
import { useQueryWithSuspense, UseQueryWithSuspenseResult } from '@/hook/query/useQueryWithSuspense';
import { fromResponse, TaskDto } from '@/dto/TaskDto';

type Args = {
  readonly projectId: string;
  readonly taskId: string;
};

export const useGetTaskQuery: (args: Args) => UseQueryWithSuspenseResult<TaskDto> = ({
                                                                                    projectId,
                                                                                    taskId
                                                                                  }) => {
  const { api } = useContext(ApiContext);

  const query = () => {
    return api.getProjectsProjectIdTasksTaskId({ projectId, taskId })
      .then(e => fromResponse(e));
  };

  return useQueryWithSuspense<TaskDto>('getTask', query);
};
