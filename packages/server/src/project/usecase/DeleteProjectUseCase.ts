import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY, ProjectRepository } from '@/project/model/repository/ProjectRepository';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { mergeMap, Observable } from 'rxjs';
import { isNil } from 'lodash';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {
  }

  exec(props: DeleteProjectProps): Observable<void> {
    // TODO カンバンおよびTaskの削除
    return this.projectRepository.findById(ProjectId.from(props.id))
      .pipe(
        mergeMap((e) => {
          if (isNil(e)) {
            // TODO
            throw new Error('');
          }

          return this.projectRepository.delete(e.id);
        }),
      );
  }
}

type DeleteProjectProps = {
  readonly id: string;
};
