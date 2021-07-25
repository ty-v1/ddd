import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY, ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { map, Observable } from 'rxjs';
import { ProjectDto } from '@/project/usecase/ProjectDto';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { isNil } from 'lodash-es';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  exec(props: GetProjectProps): Observable<ProjectDto> {
    return this.projectRepository.findById(props.id).pipe(
      map((e) => {
        if (isNil(e)) {
          // TODO
          throw new Error('');
        }

        return {
          id: e.id,
          name: e.name,
          description: e.description,
          createDateTime: e.createDateTime,
          updateDateTime: e.updateDateTime,
        };
      }),
    );
  }
}

export type GetProjectProps = {
  readonly id: ProjectId;
};
