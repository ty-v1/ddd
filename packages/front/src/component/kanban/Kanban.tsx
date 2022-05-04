import React from 'react';
import { createDnDContext } from '@/hook/dnd/DnDContext';
import Immutable from 'immutable';
import { useDnD } from '@/hook/dnd/useDnD';
import { Task, TaskStatus } from '@/dto/Task';
import { TaskList } from '@/component/kanban/TaskList';
import { useListTaskQuery } from '@/hook/query/task/useListTaskQuery';


export const Kanban: React.FC = () => {
  const { data } = useListTaskQuery();

  const DnDContext = createDnDContext<Task>();
  let map = Immutable.Map<TaskStatus, Immutable.List<Task>>({});
  (data ?? []).forEach((e) => {
    const status = e.status;

    const list = map.get(status)
      ?.push(e);
    map = map.set(status, list ?? Immutable.List.of());
  });

  const context = useDnD<Task>({
    initialData: map
  });

  return (
    <DnDContext.Provider value={context}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: '20px', border: '1px solid black' }}>
          <TaskList status="ToDo"
                    tasks={map.get('ToDo') ?? Immutable.List.of<Task>()}/>
        </div>
        <div style={{ flexBasis: '20px', border: '1px solid black' }}>
          <TaskList status="Doing"
                    tasks={map.get('Doing') ?? Immutable.List.of<Task>()}/>
        </div>
        <div style={{ flexBasis: '20px', border: '1px solid black' }}>
          <TaskList status="Done"
                    tasks={map.get('Done') ?? Immutable.List.of<Task>()}/>
        </div>
      </div>
    </DnDContext.Provider>
  );
};
