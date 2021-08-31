import { Observable } from 'rxjs';
import { LabelEntity } from '@/label/model/entity/LabelEntity';
import { LabelId } from '@/label/model/entity/LabelId';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { Color } from '@/label/model/entity/Color';

export interface LabelRepository {
  findById(id: LabelId): Observable<LabelEntity | undefined>;

  findByProjectId(id: ProjectId): Observable<LabelEntity>;

  update(entity: LabelEntity): Observable<LabelEntity>;

  save(entity: LabelEntity): Observable<LabelEntity>;

  delete(id: LabelId): Observable<void>;

  existsSameLabel(projectId: ProjectId, color: Color, name: string): Observable<boolean>;
}

export const LABEL_REPOSITORY = 'label-repository';
