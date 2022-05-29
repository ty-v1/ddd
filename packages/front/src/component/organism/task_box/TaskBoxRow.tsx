import React from 'react';
import { TaskDto } from '@/dto/TaskDto';
import { MdAccessTime } from 'react-icons/all';
import { DefaultDateFormatter } from '@/util/constants';
import { TimeStamp } from '@/component/atom/time_stamp/TimeStamp';

type Props = {
  readonly task: TaskDto;
}

export const TaskBoxRow: React.FC<Props> = ({ task }) => {
  return (
    // TODO mouse over animation
    <div className="Box-row">
      {/*TODO link*/}
      <h3>
        <a className="color-fg-default no-underline" href="">
          <span className="Link--onHover">{task.name}</span>
        </a>
      </h3>
      <MdAccessTime/><TimeStamp>Created on {task.createDate.format(DefaultDateFormatter)}</TimeStamp>
    </div>
  );
};
