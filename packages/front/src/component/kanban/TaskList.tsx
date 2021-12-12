import React, { ReactNode } from 'react';
import { CardList } from '@/component/card/CardList';
import Immutable from 'immutable';
import { Task, TaskStatus } from '@/dto/Task';

type Props = {
  readonly status: TaskStatus;
  readonly tasks: Immutable.List<Task>;
};

const createCardItem: (task: Task, index: number) => [ReactNode, string] = (task) => {

  const content = (
    <div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );

  return [
    content,
    task.id,
  ];
};

const getLabel: (status: TaskStatus) => string = (status) => {
  switch (status) {
    case 'ToDo':
      return 'ToDo';
    case 'Doing':
      return 'Doing';
    case 'Done':
      return 'Done';
    default:
      return '';
  }
};

export const TaskList: React.FC<Props> = ({ tasks, status }) => {
  return (
    <div>
      <h3>{getLabel(status)}</h3>
      <CardList items={tasks}
                group={status}
                cardFactory={createCardItem}/>
    </div>
  );
};
