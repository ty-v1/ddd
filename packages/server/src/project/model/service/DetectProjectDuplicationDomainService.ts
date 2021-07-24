import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY, ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { map, Observable } from 'rxjs';

@Injectable()
export class DetectProjectDuplicationDomainService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
  ) {}

  isDuplicated(entity: ProjectEntity): Observable<boolean> {
    return this.projectRepository.findByName(entity.name).pipe(map((e) => e !== undefined));
  }
}
