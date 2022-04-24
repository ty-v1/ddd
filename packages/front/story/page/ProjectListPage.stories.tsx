import React, { Suspense } from 'react';
import { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContext } from '@/hook/api/ApiContext';
import { Configuration, DefaultApi } from 'api';
import { ProjectListPage } from '@/page/project/ProjectListPage';

ProjectListPage.displayName = 'ProjectListPage';

export default {
  component: ProjectListPage,
  title: 'Page/ProjectListPage',
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
          <ProjectListPage/>
        </Suspense>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
