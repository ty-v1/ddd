import { ProjectId } from '@/project/model/entity/ProjectId';
import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { Observable } from 'rxjs';

export interface ProjectRepository {
  findById(id: ProjectId): Observable<ProjectEntity | undefined>;

  findByName(name: string): Observable<ProjectEntity | undefined>;

  update(entity: ProjectEntity): Observable<ProjectEntity>;

  save(entity: ProjectEntity): Observable<ProjectEntity>;

  delete(id: ProjectId): Observable<void>;
}

export const PROJECT_REPOSITORY = 'project-repository';
