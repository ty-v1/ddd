import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { Set } from 'typescript-collections';
import { ProjectWithLabels } from '@/repository/Project';
import { createSet } from '@/util/collection';

export const restoreProjectEntity: (dao: ProjectWithLabels) => ProjectEntity = (dao) => {
  const labelSet = createSet(dao.labels.map((e) => ProjectId.from(e.id)));

  return new ProjectEntity(
    ProjectId.from(dao.id),
    dao.name,
    dao.description,
    LocalDateTime.from(nativeJs(dao.created_at)),
    LocalDateTime.from(nativeJs(dao.created_at)),
    labelSet,
  );
};

type CreateProjectProps = {
  readonly name: string;
  readonly description: string;
};

export const createProject: (props: CreateProjectProps) => ProjectEntity = (props) => {
  const now = LocalDateTime.now();

  return new ProjectEntity(ProjectId.new(), props.name, props.description, now, now, new Set());
};
