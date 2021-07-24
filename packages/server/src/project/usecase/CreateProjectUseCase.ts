import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY, ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { map, mergeMap, Observable } from 'rxjs';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { LocalDateTime } from '@js-joda/core';
import { DetectProjectDuplicationDomainService } from '@/project/model/service/DetectProjectDuplicationDomainService';
import { createProject } from '@/project/model/factory/ProjectEntityFactory';
import { ProjectDto } from '@/project/usecase/ProjectDto';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly detectProjectDuplicationDomainService: DetectProjectDuplicationDomainService,
  ) {}

  exec(props: CreateProjectProps): Observable<ProjectDto> {
    const entity = createProject(props);
    return this.detectProjectDuplicationDomainService.isDuplicated(entity).pipe(
      mergeMap((isDuplicated) => {
        if (isDuplicated) {
          // TODO
          throw new Error('');
        }

        return this.projectRepository.save(entity).pipe(
          map((e) => ({
            id: e.id,
            name: e.name,
            description: e.description,
            createDateTime: e.createDateTime,
            updateDateTime: e.updateDateTime,
          })),
        );
      }),
    );
  }
}

export type CreateProjectProps = {
  readonly name: string;
  readonly description: string;
};
