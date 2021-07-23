import { ProjectRepository } from '@/common/infrastructure/ProjectRepository';
import { ProjectId } from '@/project/entity/ProjectId';
import { ProjectEntity } from '@/project/entity/ProjectEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class MysqlProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  delete(id: ProjectId): Promise<boolean> {
    return Promise.resolve(false);
  }

  findById(id: ProjectId): Promise<ProjectEntity> {
    return Promise.resolve(undefined);
  }

  save(entity: ProjectEntity): Promise<boolean> {
    return Promise.resolve(false);
  }

  update(entity: ProjectEntity): Promise<boolean> {
    return Promise.resolve(false);
  }
}
