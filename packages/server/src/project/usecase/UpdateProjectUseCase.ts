import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY, ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { map, mergeMap, Observable } from 'rxjs';
import { ProjectDto } from '@/project/usecase/ProjectDto';
import { isNil } from 'lodash';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {
  }

  exec(props: UpdateProjectProps): Observable<ProjectDto> {
    return this.projectRepository.findById(ProjectId.from(props.id))
      .pipe(
        map((entity) => {
          if (isNil(entity)) {
            // TODO
            throw new Error('');
          }

          return entity;
        }),
        mergeMap((entity) => {
          entity.update(props);
          return this.projectRepository.update(entity).pipe(
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

type UpdateProjectProps = {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
};
