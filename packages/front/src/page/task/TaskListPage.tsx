import React from 'react';
import { PageTemplate } from '@/page/PageTemplate';
import { TaskBox } from '@/component/organism/task_box/TaskBox';

export const TaskListPage: React.FC = () => {
  return (
    <PageTemplate>
      <div>
        <TaskBox/>
      </div>
    </PageTemplate>
  );
};
