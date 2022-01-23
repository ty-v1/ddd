import { ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { Injectable } from '@nestjs/common';
import { concatAll, from, map, Observable } from 'rxjs';
import { restoreProjectEntity } from '@/project/model/factory/ProjectEntityFactory';
import { InjectRepository } from '@nestjs/typeorm';
import { LabelRecord } from '@/repository/record/LabelRecord';
import { Repository } from 'typeorm';
import { ProjectRecord } from '@/repository/record/ProjectRecord';

@Injectable()
export class MysqlProjectRepository implements ProjectRepository {
  constructor(
    @InjectRepository(LabelRecord)
    private projectDao: Repository<ProjectRecord>
  ) {
  }

  findById(id: ProjectId): Observable<ProjectEntity | undefined> {
    const query = this.projectDao.findOne(id.value);
    return from(query).pipe(map((e) => (e !== undefined ? restoreProjectEntity(e) : undefined)));
  }

  save(entity: ProjectEntity): Observable<ProjectEntity> {
    const query = this.projectDao.save(ProjectRecord.from(entity));
    return from(query).pipe(map((e) => restoreProjectEntity(e)));
  }

  update(entity: ProjectEntity): Observable<ProjectEntity> {
    return this.save(entity);
  }

  delete(id: ProjectId): Observable<void> {
    const query = this.projectDao.delete(id.value);
    return from(query).pipe(map(() => void 0));
  }

  findByName(name: string): Observable<ProjectEntity | undefined> {
    const query = this.projectDao.find({
      where: {
        name,
      },
    });
    return from(query).pipe(
      concatAll(),
      map((e) => (e !== undefined ? restoreProjectEntity(e) : undefined)));
  }
}
