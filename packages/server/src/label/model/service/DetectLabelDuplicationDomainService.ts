import { Inject, Injectable } from '@nestjs/common';
import { LABEL_REPOSITORY, LabelRepository } from '@/label/model/repository/LabelRepository';
import { Observable } from 'rxjs';
import { LabelEntity } from '@/label/model/entity/LabelEntity';

@Injectable()
export class DetectLabelDuplicationDomainService {
  constructor(
    @Inject(LABEL_REPOSITORY)
    private readonly labelRepository: LabelRepository,
  ) {}

  exec(entity: LabelEntity): Observable<boolean> {
    return this.labelRepository.existsSameLabel(entity.projectId, entity.color, entity.name);
  }
}
