import React from 'react';

type Props = {
  readonly todo: number;
  readonly doing: number;
  readonly done: number;
}

// TODO filtering, icon
export const TaskBoxHeader: React.FC<Props> = ({ doing, done, todo }) => {
  return (
    <div className="Box-header">
      <span className="Counter mr-1">{todo} todos</span>
      <span className="Counter Counter--gray mr-1">{doing} doings</span>
      <span className="Counter Counter--gray">{done} dones</span>
    </div>
  );
};
