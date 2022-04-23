import { useContext } from 'react';
import { ApiContext } from '@/hook/api/ApiContext';
import { fromResponse, Project } from '@/dto/Project';
import { Paging } from '@/dto/Paging';
import { useQueryWithSuspense, UseQueryWithSuspenseResult } from '@/hook/query/useQueryWithSuspense';

/**
 * プロジェクト一覧を取得APIを実行する
 */
export const useListProjectQuery: () => UseQueryWithSuspenseResult<Paging<Project>> = () => {
  const { api } = useContext(ApiContext);

  const query = () => {
    return api.getProjects()
      .then(({ projects }) => {
        return {
          // TODO add total property to schema
          total: projects?.length ?? 0,
          records: projects?.map((e) => fromResponse(e)) ?? [],
        };
      });
  };

  return useQueryWithSuspense<Paging<Project>>('listProject', query);
};
