import React from 'react';
import { useGetTaskQuery } from '@/hook/query/task/useGetTaskQuery';
import { DefaultDateFormatter } from '@/util/constants';
import { TaskDto } from '@/dto/TaskDto';
import { Comment } from '@/component/organism/comment/Comment';
import StopWatch from '@/component/stopwatch/StopWatch';
import { formatDuration } from '@/util/duration';


type TaskHeaderProps = {
  readonly task: TaskDto;
};

const TaskHeader: React.FC<TaskHeaderProps> = ({ task }) => {

  return (
    <div className="Subhead">
      <h2 className="Subhead-heading">{task.name}</h2>
      <div className="Subhead-actions">
        {/*TODO link*/}
        <button className="btn btn-sm mr-1" role="button">Edit</button>
        <a href="#url" className="btn btn-sm btn-primary" role="button">New task</a>
      </div>
      <div className="Subhead-description">
        {createStateLabel(task)}
        Created on {task.createDate.format(DefaultDateFormatter)}
      </div>
    </div>
  );
};

type TaskSubMenuProps = {
  readonly task: TaskDto;
};

const TaskSubMenu: React.FC<TaskSubMenuProps> = ({ task }) => {

  return (
    <div className="color-fg-muted">
      <div className="mb-3 border-bottom">
        <div className="mb-1 text-bold">Labels</div>
        {/*TODO get label*/}
      </div>

      <div className="mb-3 border-bottom">
        <div className="mb-1 text-bold">Estimated</div>
        <div className="ml-2">{formatDuration(task.estimatedTime)}</div>
      </div>

      <div className="mb-3 border-bottom">
        <div className="mb-1 text-bold">Elapsed</div>
        <div className="ml-2">
          {
            task.status === 'done' ?
              <span>{formatDuration(task.elapsedTime)}</span> :
              <StopWatch value={task.elapsedTime}/>
          }
        </div>
      </div>
    </div>
  );
};


export const Task: React.FC = () => {
  // TODO get id from router
  const { data } = useGetTaskQuery({
    taskId: 'id',
    projectId: 'id'
  });

  return (
    <div className="Layout Layout--sidebarPosition-end">
      <div className="Layout-main">
        <TaskHeader task={data}/>
        <Comment id={data.id}
                 description={data.description}
                 updateDateTime={data.createDate}
                 onUpdate={() => {
                   // TODO
                   return;
                 }}/>
      </div>

      <div className="Layout-sidebar">
        <TaskSubMenu task={data}/>
      </div>
    </div>
  );
};


const createStateLabel = (dto: TaskDto) => {
  switch (dto.status) {
    case 'todo':
      return <span className="State State--open mr-2">ToDo</span>;
    case 'doing':
      return <span className="State State--draft mr-2">Doing</span>;
    case 'done':
      return <span className="State State--merged mr-2">Done</span>;
    default:
      return null;
  }
};
