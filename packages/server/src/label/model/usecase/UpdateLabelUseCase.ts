import { Inject, Injectable } from '@nestjs/common';
import { from, map, mergeMap, Observable } from 'rxjs';
import { LABEL_REPOSITORY, LabelRepository } from '@/label/model/repository/LabelRepository';
import { DetectLabelDuplicationDomainService } from '@/label/model/service/DetectLabelDuplicationDomainService';
import { Color } from '@/label/model/entity/Color';
import {
  DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE,
  DetectProjectExistenceDomainService,
} from '@/shared/project/DetectProjectExistenceDomainService';
import { LabelId } from '@/label/model/entity/LabelId';
import { isNil } from 'lodash';
import { LabelDto } from '@/label/model/usecase/LabelDto';

@Injectable()
export class UpdateLabelUseCase {
  constructor(
    @Inject(LABEL_REPOSITORY)
    private readonly labelRepository: LabelRepository,
    private readonly detectLabelDuplicationDomainService: DetectLabelDuplicationDomainService,
    @Inject(DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE)
    private readonly detectProjectExistenceDomainService: DetectProjectExistenceDomainService,
  ) {
  }

  exec(props: UpdateLabelProps): Observable<LabelDto> {
    // TODO バリデーション
    const id = LabelId.from(props.id);
    const projectId = LabelId.from(props.id);
    const color = props.color !== undefined ? Color.from(props.color) : undefined;
    const name = props.name;
    const description = props.description;

    return this.labelRepository.findById(id)
      .pipe(
        map((entity) => {
          if (isNil(entity)) {
            // TODO
            throw new Error();
          }

          return entity;
        }),
        mergeMap((entity) => {
          if (name === undefined) {
            return from([entity]);
          }

          return this.detectLabelDuplicationDomainService.exec({ id, name, projectId })
            .pipe(map((isDuplicated) => {
              if (isDuplicated) {
                // TODO
                throw new Error();
              }

              return entity;
            }));
        }),
        mergeMap((entity) => {
          entity.update({
            name,
            color,
            description
          });
          return this.labelRepository.update(entity);
        })
      );
  }
}

type UpdateLabelProps = {
  readonly id: string;
  readonly projectId: string;
  readonly name?: string;
  readonly color?: string;
  readonly description?: string;
};
