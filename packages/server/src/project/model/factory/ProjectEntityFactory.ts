import { ProjectEntity } from '@/project/model/entity/ProjectEntity';
import { Project } from '@prisma/client';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { ProjectId } from '@/project/model/entity/ProjectId';

export const restoreProjectEntity: (dao: Project | null) => ProjectEntity | undefined = (dao) => {
  if (dao === null) {
    return undefined;
  }

  return new ProjectEntity(
    ProjectId.from(dao.id),
    dao.name,
    dao.description,
    LocalDateTime.from(nativeJs(dao.created_at)),
    LocalDateTime.from(nativeJs(dao.created_at)),
  );
};
