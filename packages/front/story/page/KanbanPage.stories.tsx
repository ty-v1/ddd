import React from 'react';
import { Meta } from '@storybook/react';
import { KanbanPage } from '@/page/KanbanPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContext } from '@/hook/api/ApiContext';
import { DefaultApi } from 'api';

KanbanPage.displayName = 'KanbanPage';

export default {
  component: KanbanPage,
  title: 'KanbanPage',
} as Meta;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const api = new DefaultApi();

const Template = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={{api}}>
        <KanbanPage/>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
