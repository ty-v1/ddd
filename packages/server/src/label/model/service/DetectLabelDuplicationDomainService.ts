import { Inject, Injectable } from '@nestjs/common';
import { LABEL_REPOSITORY, LabelRepository } from '@/label/model/repository/LabelRepository';
import { NewLabel } from '@/label/model/service/NewLabel';
import { Observable } from 'rxjs';

@Injectable()
export class DetectLabelDuplicationDomainService {
  constructor(
    @Inject(LABEL_REPOSITORY)
    private readonly labelRepository: LabelRepository,
  ) {}

  exec(label: NewLabel): Observable<boolean> {
    return this.labelRepository.existsSameLabel(label.projectId, label.color, label.name);
  }
}
