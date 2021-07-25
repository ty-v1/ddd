import { ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { restoreProjectEntity } from '@/project/model/factory/ProjectEntityFactory';
import { PrismaService } from '@/repository/PrismaService';
import { convert } from '@js-joda/core';

@Injectable()
export class MysqlProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: ProjectId): Observable<ProjectEntity | undefined> {
    const query = this.prisma.project.findUnique({
      where: { id: id.value },
    });
    return from(query).pipe(map((e) => (e !== null ? restoreProjectEntity(e) : undefined)));
  }

  save(entity: ProjectEntity): Observable<ProjectEntity> {
    const query = this.prisma.project.create({
      data: {
        id: entity.id.value,
        name: entity.name,
        description: entity.description,
        created_at: convert(entity.createDateTime).toDate(),
        updated_at: convert(entity.updateDateTime).toDate(),
      },
    });
    return from(query).pipe(map((e) => restoreProjectEntity(e)));
  }

  update(entity: ProjectEntity): Observable<ProjectEntity> {
    const query = this.prisma.project.update({
      where: {
        id: entity.id.value,
      },
      data: {
        id: entity.id.value,
        name: entity.name,
        description: entity.description,
        updated_at: convert(entity.updateDateTime).toDate(),
      },
    });
    return from(query).pipe(map((e) => restoreProjectEntity(e)));
  }

  delete(id: ProjectId): Observable<void> {
    const query = this.prisma.project.delete({
      where: {
        id: id.value,
      },
    });
    return from(query).pipe(map(() => void 0));
  }

  findByName(name: string): Observable<ProjectEntity | undefined> {
    const query = this.prisma.project.findFirst({
      where: { name },
    });
    return from(query).pipe(map((e) => (e !== null ? restoreProjectEntity(e) : undefined)));
  }
}
