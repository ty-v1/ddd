import { Inject, Injectable } from '@nestjs/common';
import { concatMap, count, map, mergeMap, Observable } from 'rxjs';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { LABEL_REPOSITORY, LabelRepository } from '@/label/model/repository/LabelRepository';
import { DetectLabelDuplicationDomainService } from '@/label/model/service/DetectLabelDuplicationDomainService';
import { createLabelEntity } from '@/label/model/entity/LabelFactory';
import {
  DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE,
  DetectProjectExistenceDomainService,
} from '@/shared/project/DetectProjectExistenceDomainService';
import { LabelDto } from '@/label/model/usecase/LabelDto';

@Injectable()
export class CreateLabelUseCase {
  constructor(
    @Inject(LABEL_REPOSITORY)
    private readonly labelRepository: LabelRepository,
    private readonly detectLabelDuplicationDomainService: DetectLabelDuplicationDomainService,
    @Inject(DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE)
    private readonly detectProjectExistenceDomainService: DetectProjectExistenceDomainService,
  ) {
  }

  exec(props: CreateLabelProps): Observable<LabelDto> {
    // TODO バリデーション
    const projectId = ProjectId.from(props.projectId);

    return this.detectProjectExistenceDomainService.exec(projectId).pipe(
      mergeMap((e) => {
        if (!e) {
          // TODO
          throw new Error();
        }

        return this.labelRepository.findByProjectId(projectId);
      }),
      count(),
      concatMap((e) => {
        if (e > 24) {
          // TODO
          throw new Error('');
        }

        const entity = createLabelEntity({ ...props });

        return this.detectLabelDuplicationDomainService.exec(entity).pipe(
          mergeMap((isDuplicated) => {
            if (isDuplicated) {
              // TODO
              throw new Error();
            }

            return this.labelRepository.save(entity);
          }),
        );
      }),
      mergeMap((e) => {
        return this.labelRepository.save(e).pipe(
          map((e) => ({
            id: e.id,
            name: e.name,
            color: e.color,
            description: e.description,
          })),
        );
      }),
    );
  }
}

type CreateLabelProps = {
  readonly projectId: string;
  readonly color: string;
  readonly name: string;
  readonly description: string;
};
