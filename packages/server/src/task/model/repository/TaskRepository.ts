import { Observable } from 'rxjs';
import { TaskEntity } from '@/task/model/entity/TaskEntity';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { TaskStatus } from '@/task/model/entity/TaskStatus';
import { TaskId } from '@/task/model/entity/TaskId';

export interface TaskRepository {
  findByProjectId(projectId: ProjectId): Observable<TaskEntity>;

  findByProjectIdAndStatus(projectId: ProjectId, status: TaskStatus): Observable<TaskEntity>;

  save(entity: TaskEntity): Observable<TaskEntity | undefined>;

  update(entity: TaskEntity): Observable<TaskEntity | undefined>;

  delete(id: TaskId): Observable<void>;
}

export const TASK_REPOSITORY = 'TaskRepository';
