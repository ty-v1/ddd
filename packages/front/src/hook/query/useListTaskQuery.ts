import { useQuery } from 'react-query';
import { useContext } from 'react';
import { ApiContext } from '@/hook/api/ApiContext';
import { Task } from '@/dto/Task';
import { UseQueryResult } from 'react-query/types/react/types';

// TODO サンプル実装
export const useListTaskQuery: () => UseQueryResult<ReadonlyArray<Task>> = () => {
  const { api } = useContext(ApiContext);
  return useQuery<Task[]>(
    'listTask',
    () => {
      return new Promise<Task[]>((resolve => {
        setTimeout(() => resolve([]), 1000);
      }));
    },
    {
      suspense: true,
      staleTime: 1000,
    });
};
