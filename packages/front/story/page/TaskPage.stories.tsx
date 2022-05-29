import React, { Suspense } from 'react';
import { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContext } from '@/hook/api/ApiContext';
import { Configuration, DefaultApi } from 'api';
import { TaskPage } from '@/page/task/TaskPage';

TaskPage.displayName = 'TaskPage';

export default {
  component: TaskPage,
  title: 'Page/TaskPage',
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
          <TaskPage/>
        </Suspense>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
