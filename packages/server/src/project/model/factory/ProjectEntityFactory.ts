import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { Project } from '@prisma/client';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { ProjectId } from '@/project/model/entity/ProjectId';

export const restoreProjectEntity: (dao: Project) => ProjectEntity = (dao) => {
  return new ProjectEntity(
    ProjectId.from(dao.id),
    dao.name,
    dao.description,
    LocalDateTime.from(nativeJs(dao.created_at)),
    LocalDateTime.from(nativeJs(dao.created_at)),
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
