import { Injectable } from '@nestjs/common';
import { from, map, mergeAll, Observable } from 'rxjs';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { TaskRepository } from '@/task/model/repository/TaskRepository';
import { TaskStatus } from '@/task/model/entity/TaskStatus';
import { TaskEntity } from '@/task/model/entity/TaskEntity';
import { TaskId } from '@/task/model/entity/TaskId';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRecord } from '@/repository/record/TaskRecord';
import { LabelId } from '@/label/model/entity/LabelId';
import { createSet } from '@/util/collection';

@Injectable()
export class MysqlTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskRecord)
    private taskDao: Repository<TaskRecord>
  ) {
  }

  findByProjectIdAndStatus(projectId: ProjectId, status: TaskStatus): Observable<TaskEntity> {
    const query = this.taskDao.find({
      projectId: projectId.value,
      status,
    });

    return from(query).pipe(
      mergeAll(),
      map((e) => restoreTaskEntity(e)),
    );
  }

  save(entity: TaskEntity): Observable<TaskEntity> {
    const record = TaskRecord.from(entity);
    const query = this.taskDao.save(record);

    return from(query).pipe(map((e) => restoreTaskEntity(e)));
  }

  delete(id: TaskId): Observable<void> {
    const query = this.taskDao.delete({
      id: id.value
    });

    return from(query).pipe(map(() => void 0));
  }

  findByProjectId(projectId: ProjectId): Observable<TaskEntity> {
    const query = this.taskDao.find({
      projectId: projectId.value
    });

    return from(query).pipe(
      mergeAll(),
      map((e) => restoreTaskEntity(e)),
    );
  }

  findById(id: TaskId): Observable<TaskEntity | undefined> {
    const query = this.taskDao.findOne(id.value);

    return from(query).pipe(map((e) => (e !== undefined ? restoreTaskEntity(e) : undefined)));
  }

  update(entity: TaskEntity): Observable<TaskEntity> {
    const record = TaskRecord.from(entity);
    const query = this.taskDao.save(record);

    return from(query).pipe(map((e) => restoreTaskEntity(e)));
  }
}

const restoreTaskEntity: (record: TaskRecord) => TaskEntity = (record) => {
  const labelIds = record.labels.map((e) => LabelId.from(e.labelId));

  return new TaskEntity(
    TaskId.from(record.id),
    record.name,
    record.description,
    ProjectId.from(record.projectId),
    createSet(labelIds),
    record.status as TaskStatus,
    LocalDateTime.from(nativeJs(record.createdAt)),
  );
};
