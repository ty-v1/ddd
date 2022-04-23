import React from 'react';
import { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiContext } from '@/hook/api/ApiContext';
import { DefaultApi } from 'api';
import { PageTemplate } from '@/page/PageTemplate';

PageTemplate.displayName = 'PageTemplate';

export default {
  component: PageTemplate,
  title: 'Page/PageTemplate',
} as Meta;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

// TODO path to mock sever
const api = new DefaultApi();

const Template = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={{ api }}>
        <PageTemplate>Content</PageTemplate>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
