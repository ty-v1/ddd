import React, { ReactNode } from 'react';
import { CardList } from '@/component/molecule/card/CardList';
import Immutable from 'immutable';
import { Task } from '@/dto/Task';
import { Column } from '@/dto/Column';
import { useDnDContext } from '@/hook/dnd/DnDContext';

type Props = {
  readonly column: Column;
};

const createCardItem: (task: Task, index: number) => [ReactNode, string] = (task) => {

  const content = (
    <div>
      <h4>{task.name}</h4>
      <p>{task.description}</p>
    </div>
  );

  return [
    content,
    task.id,
  ];
};

export const ProjectColumn: React.FC<Props> = ({ column }) => {
  const { groupToItems } = useDnDContext<Task>();

  return (
    <div className="Box height-full width-full">
      <div className="Box-header">
        {/*TODO*/}
        <h3>{'Project Name'}</h3>
      </div>
      <div className="Box-body">
        <CardList items={groupToItems.get(column.id) ?? Immutable.List.of<Task>()}
                  group={column.id}
                  cardFactory={createCardItem}/>

      </div>
    </div>
  );
};
