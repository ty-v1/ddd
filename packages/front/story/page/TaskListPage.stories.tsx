import React, { Suspense } from 'react';
import { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContext } from '@/hook/api/ApiContext';
import { Configuration, DefaultApi } from 'api';
import { TaskListPage } from '@/page/task/TaskListPage';

TaskListPage.displayName = 'TaskListPage';

export default {
  component: TaskListPage,
  title: 'Page/TaskListPage',
} as Meta;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

// TODO path to mock sever
const api = new DefaultApi(
  new Configuration({
    basePath: 'http://127.0.0.1:3100',
  })
);

const Template = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={{ api }}>
        <Suspense fallback="loading">
          <TaskListPage/>
        </Suspense>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
