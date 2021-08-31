import { Color } from '@/label/model/entity/Color';
import { ProjectId } from '@/project/model/entity/ProjectId';

export type NewLabel = {
  readonly color: Color;
  readonly name: string;
  readonly projectId: ProjectId;
};
