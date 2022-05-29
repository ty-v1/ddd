import React from 'react';
import { PageTemplate } from '@/page/PageTemplate';
import { Task } from '@/component/organism/task/Task';

export const TaskPage: React.FC = () => {
  return (
    <PageTemplate>
      <Task/>
    </PageTemplate>
  );
};
