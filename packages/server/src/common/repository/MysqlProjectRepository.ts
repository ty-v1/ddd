import { ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Observable } from 'rxjs';
import { restoreProjectEntity } from '@/project/model/factory/ProjectEntityFactory';
import { MysqlDateTimeFormat } from '@/util/mysql-date-time';

@Injectable()
export class MysqlProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: ProjectId): Observable<ProjectEntity> {
    return new Observable((s) => {
      this.prisma.project
        .findUnique({
          where: {
            id: id.value,
          },
        })
        .then((dao) => s.next(restoreProjectEntity(dao)))
        .catch((error) => s.error(error))
        .finally(() => s.complete());
    });
  }

  save(entity: ProjectEntity): Observable<ProjectEntity> {
    return new Observable((s) => {
      this.prisma.project
        .create({
          data: {
            id: entity.id.value,
            name: entity.name,
            description: entity.description,
            created_at: entity.createDateTime.format(MysqlDateTimeFormat),
            updated_at: entity.createDateTime.format(MysqlDateTimeFormat),
          },
        })
        .then((dao) => s.next(restoreProjectEntity(dao)))
        .catch((error) => s.error(error))
        .finally(() => s.complete());
    });
  }

  update(entity: ProjectEntity): Observable<ProjectEntity> {
    return new Observable((s) => {
      this.prisma.project
        .update({
          where: {
            id: entity.id.value,
          },
          data: {
            id: entity.id.value,
            name: entity.name,
            description: entity.description,
            updated_at: entity.updateDateTime.format(MysqlDateTimeFormat),
          },
        })
        .then((dao) => s.next(restoreProjectEntity(dao)))
        .catch((error) => s.error(error))
        .finally(() => s.complete());
    });
  }

  delete(id: ProjectId): Observable<void> {
    return new Observable((s) => {
      this.prisma.project
        .delete({
          where: {
            id: id.value,
          },
        })
        .catch((error) => s.error(error))
        .finally(() => s.complete());
    });
  }
}
