import React from 'react';
import { useListTaskQuery } from '@/hook/query/task/useListTaskQuery';
import { TaskBoxRow } from '@/component/organism/task_box/TaskBoxRow';
import { TaskBoxHeader } from '@/component/organism/task_box/TaskBoxHeader';

export const TaskBox: React.FC = () => {
  // TODO get from react router
  const { data } = useListTaskQuery({ projectId: 'id' });

  return (
    <div className="Box">
      <TaskBoxHeader todo={data.todoCount}
                     doing={data.doingCount}
                     done={data.doneCount}/>
      {
        data.tasks.map((e) => (<TaskBoxRow key={e.id} task={e}/>))
      }
    </div>
  );
};
