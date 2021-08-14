import { Inject, Injectable } from '@nestjs/common';
import { mergeMap, Observable } from 'rxjs';
import { LABEL_REPOSITORY, LabelRepository } from '@/label/model/repository/LabelRepository';
import { LabelId } from '@/label/model/entity/LabelId';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class DeleteLabelUseCase {
  constructor(
    @Inject(LABEL_REPOSITORY)
    private readonly labelRepository: LabelRepository,
  ) {}

  exec(props: DeleteLabelProps): Observable<void> {
    // TODO バリデーション
    const labelId = LabelId.from(props.id);

    return this.labelRepository.findById(labelId).pipe(
      mergeMap((e) => {
        if (isNil(e)) {
          // TODO
          throw new Error();
        }

        return this.labelRepository.delete(labelId);
      }),
    );
  }
}

type DeleteLabelProps = {
  readonly id: string;
};
