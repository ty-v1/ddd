import { Inject, Injectable } from '@nestjs/common';
import { LABEL_REPOSITORY, LabelRepository } from '@/label/model/repository/LabelRepository';
import { Observable } from 'rxjs';
import { LabelId } from '@/label/model/entity/LabelId';
import { ProjectId } from '@/project/model/entity/ProjectId';

@Injectable()
export class DetectLabelDuplicationDomainService {
  constructor(
    @Inject(LABEL_REPOSITORY)
    private readonly labelRepository: LabelRepository,
  ) {
  }

  exec(props: {
    readonly id?: LabelId;
    readonly name: string;
    readonly projectId: ProjectId;
  }): Observable<boolean> {
    return this.labelRepository.existsSameLabel(props);
  }
}
