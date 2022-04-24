import React from 'react';
import { Meta } from '@storybook/react';
import { KanbanPage } from '@/page/KanbanPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContext } from '@/hook/api/ApiContext';
import { Configuration, DefaultApi } from 'api';

KanbanPage.displayName = 'KanbanPage';

export default {
  component: KanbanPage,
  title: 'Page/KanbanPage',
} as Meta;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false
    },
  },
});

const api = new DefaultApi(
  new Configuration({
    basePath: 'http://127.0.0.1:3100',
  })
);

const Template = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={{ api }}>
        <KanbanPage/>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
