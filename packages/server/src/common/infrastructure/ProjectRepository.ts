import { ProjectId } from '@/project/entity/ProjectId';
import { ProjectEntity } from '@/project/entity/ProjectEntity';

export interface ProjectRepository {
  findById(id: ProjectId): Promise<ProjectEntity>;

  update(entity: ProjectEntity): Promise<boolean>;

  save(entity: ProjectEntity): Promise<boolean>;

  delete(id: ProjectId): Promise<boolean>;
}
