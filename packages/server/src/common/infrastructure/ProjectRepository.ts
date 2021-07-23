import { ProjectId } from '@/project/entity/ProjectId';
import { ProjectEntity } from '@/project/entity/ProjectEntity';
import { Observable } from 'rxjs';

export interface ProjectRepository {
  findById(id: ProjectId): Observable<ProjectEntity>;

  update(entity: ProjectEntity): Observable<ProjectEntity>;

  save(entity: ProjectEntity): Observable<ProjectEntity>;

  delete(id: ProjectId): Observable<void>;
}
