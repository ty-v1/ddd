import { Inject, Injectable } from '@nestjs/common';
import { mergeMap, Observable } from 'rxjs';
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
  ) {}

  exec(props: UpdateLabelProps): Observable<LabelDto> {
    // TODO バリデーション
    const labelId = LabelId.from(props.id);
    const color = Color.from(props.color);
    const name = props.name;

    return this.labelRepository.findById(labelId).pipe(
      mergeMap((entity) => {
        if (isNil(entity)) {
          // TODO
          throw new Error();
        }

        if (entity.isSame(name, color)) {
          // TODO
          throw new Error();
        }

        return this.detectLabelDuplicationDomainService.exec(entity).pipe(
          mergeMap((isDuplicated) => {
            if (isDuplicated) {
              // TODO
              throw new Error();
            }

            return this.labelRepository.update(entity);
          }),
        );
      }),
    );
  }
}

type UpdateLabelProps = {
  readonly id: string;
  readonly color: string;
  readonly name: string;
  readonly description: string;
};
