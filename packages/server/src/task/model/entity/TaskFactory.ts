import { Injectable } from '@nestjs/common';
import { TaskEntity } from '@/task/model/entity/TaskEntity';
import { TaskId } from '@/task/model/entity/TaskId';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { createSet } from '@/util/collection';
import { LabelId } from '@/label/model/entity/LabelId';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { TaskStatus } from '@/task/model/entity/TaskStatus';
import { TaskWithLabelsAndHistories } from '@/repository/Task';
import { TimerHistory } from '@/task/model/entity/TimerHistory';
import { TimerState } from '@/task/model/entity/TimerState';
import { Timer } from '@/task/model/entity/Timer';

export const restoreTaskEntity: (dao: TaskWithLabelsAndHistories) => TaskEntity = (dao) => {
  const labelIds = dao.labels.map((e) => LabelId.from(e.label_id));

  const histories = dao.histories.map(
    (e) => new TimerHistory(e.id, LocalDateTime.from(nativeJs(dao.created_at)), e.state as TimerState),
  );

  return new TaskEntity(
    TaskId.from(dao.id),
    dao.name,
    dao.description,
    ProjectId.from(dao.project_id),
    createSet(labelIds),
    dao.status as TaskStatus,
    new Timer(histories),
    LocalDateTime.from(nativeJs(dao.created_at)),
  );
};

@Injectable()
export class TaskFactory {
  restore(): TaskEntity | null {
    return null;
  }

  new(): TaskEntity | null {
    return null;
  }
}
