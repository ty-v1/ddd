import { ProjectId } from '@/project/model/entity/ProjectId';
import { LocalDateTime } from '@js-joda/core';

export type ProjectDto = {
  readonly id: ProjectId;
  readonly name: string;
  readonly description: string;
  readonly createDateTime: LocalDateTime;
  readonly updateDateTime: LocalDateTime;
};
