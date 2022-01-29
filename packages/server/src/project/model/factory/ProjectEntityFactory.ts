import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { ProjectRecord } from '@/repository/record/ProjectRecord';

export const restoreProjectEntity: (record: ProjectRecord) => ProjectEntity = (record) => {
  return new ProjectEntity(
    ProjectId.from(record.id),
    record.name,
    record.description,
    LocalDateTime.from(nativeJs(record.createdAt)),
    LocalDateTime.from(nativeJs(record.updatedAt)),
  );
};

type CreateProjectProps = {
  readonly name: string;
  readonly description: string;
};

export const createProject: (props: CreateProjectProps) => ProjectEntity = (props) => {
  const now = LocalDateTime.now();

  return new ProjectEntity(ProjectId.new(), props.name, props.description, now, now);
};
