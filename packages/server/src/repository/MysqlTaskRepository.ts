import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/repository/PrismaService';
import { from, map, mergeAll, Observable } from 'rxjs';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { convert } from '@js-joda/core';
import { TaskRepository } from '@/task/model/repository/TaskRepository';
import { TaskStatus } from '@/task/model/entity/TaskStatus';
import { TaskEntity } from '@/task/model/entity/TaskEntity';
import { restoreTaskEntity } from '@/task/model/entity/TaskFactory';
import { TaskId } from '@/task/model/entity/TaskId';

@Injectable()
export class MysqlTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByProjectIdAndStatus(projectId: ProjectId, status: TaskStatus): Observable<TaskEntity> {
    const query = this.prisma.task.findMany({
      where: {
        project_id: projectId.value,
        status,
      },
      include: {
        project: false,
        labels: true,
        histories: true,
      },
    });

    return from(query).pipe(
      mergeAll(),
      map((e) => restoreTaskEntity(e)),
    );
  }

  save(entity: TaskEntity): Observable<TaskEntity> {
    const query = this.prisma.task.create({
      data: {
        id: entity.id.value,
        project_id: entity.projectId.value,
        name: entity.name,
        description: entity.description,
        status: entity.status,
        created_at: convert(entity.createDateTime).toDate(),
        updated_at: convert(entity.createDateTime).toDate(),
        labels: {
          connect: entity.labelIds.map((e) => ({
            task_id_label_id: {
              task_id: entity.id.value,
              label_id: e.value,
            },
          })),
        },
      },
      include: {
        labels: true,
        histories: true,
      },
    });

    return from(query).pipe(map((e) => restoreTaskEntity(e)));
  }

  delete(id: TaskId): Observable<void> {
    const query = this.prisma.task.delete({
      where: {
        id: id.value,
      },
      include: {
        histories: true,
      },
    });

    return from(query).pipe(map(() => void 0));
  }

  findByProjectId(projectId: ProjectId): Observable<TaskEntity> {
    const query = this.prisma.task.findMany({
      where: {
        project_id: projectId.value,
      },
      include: {
        labels: true,
        histories: true,
      },
    });

    return from(query).pipe(
      mergeAll(),
      map((e) => restoreTaskEntity(e)),
    );
  }

  findById(id: TaskId): Observable<TaskEntity | undefined> {
    const query = this.prisma.task.findUnique({
      where: {
        id: id.value,
      },
      include: {
        labels: true,
        histories: true,
      },
    });

    return from(query).pipe(map((e) => (e !== null ? restoreTaskEntity(e) : undefined)));
  }

  update(entity: TaskEntity): Observable<TaskEntity> {
    const query = this.prisma.$transaction([
      this.prisma.task.update({
        where: {
          id: entity.id.value,
        },
        data: {
          labels: {
            set: [],
          },
        },
        include: {
          labels: true,
          histories: true,
        },
      }),
      this.prisma.task.update({
        where: {
          id: entity.id.value,
        },
        data: {
          name: entity.name,
          description: entity.description,
          status: entity.status,
          updated_at: convert(entity.createDateTime).toDate(),
          labels: {
            connect: entity.labelIds.map((e) => ({
              task_id_label_id: {
                task_id: entity.id.value,
                label_id: e.value,
              },
            })),
          },
          histories: {
            createMany: {
              data: entity.histories.map((e) => ({
                id: e.id,
                state: e.status,
                created_at: convert(e.eventTime).toDate(),
                task_id: entity.id.value,
              })),
              skipDuplicates: true,
            },
          },
        },
        include: {
          labels: true,
          histories: true,
        },
      }),
    ]);

    return from(query).pipe(map((e) => restoreTaskEntity(e[1])));
  }
}
