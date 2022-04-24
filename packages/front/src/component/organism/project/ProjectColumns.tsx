import React from 'react';
import Immutable from 'immutable';
import { Task } from '@/dto/Task';
import { ProjectColumn } from '@/component/organism/project/ProjectColumn';
import { useDnD } from '@/hook/dnd/useDnD';
import { useListColumnQuery } from '@/hook/query/column/useListColumnQuery';
import { createDnDContext } from '@/hook/dnd/DnDContext';
import { useListTaskQuery } from '@/hook/query/task/useListTaskQuery';

export const ProjectColumns: React.FC = () => {
  // TODO react router
  const { data: columns } = useListColumnQuery({
    projectId: 'id'
  });
  const { data: tasks } = useListTaskQuery({
    projectId: 'id',
    enabled: columns !== undefined
  });

  const columnToTasks = columns.map(({ id }) => {
    return {
      columnId: id,
      // TODO filter by columnId
      tasks: Immutable.List<Task>(tasks.filter(() => true))
    };
  }).reduce((p, c) => ({
    ...p,
    [c.columnId]: c.tasks
  }), {});

  const DnDContext = createDnDContext<Task>();
  const context = useDnD<Task>({
    initialData: Immutable.Map<Immutable.List<Task>>(columnToTasks)
  });

  return (
    <DnDContext.Provider value={context}>
      <div>
        {
          columns.map((e) => (
            <ProjectColumn key={e.id} column={e}/>
          ))
        }
      </div>
    </DnDContext.Provider>
  );
};
