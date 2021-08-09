import { DetectProjectExistenceDomainService } from '@/shared/project/DetectProjectExistenceDomainService';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { map, Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY, ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { isNil } from 'lodash-es';

@Injectable()
export class DetectProjectExistenceDomainServiceImpl implements DetectProjectExistenceDomainService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  exec(projectId: ProjectId): Observable<boolean> {
    return this.projectRepository.findById(projectId).pipe(map((e) => !isNil(e)));
  }
}
