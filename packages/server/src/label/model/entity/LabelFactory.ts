import { Label } from '@prisma/client';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { LabelEntity } from '@/label/model/entity/LabelEntity';
import { LabelId } from '@/label/model/entity/LabelId';
import { Color } from '@/label/model/entity/Color';
import { ProjectId } from '@/project/model/entity/ProjectId';

export const restoreLabelEntity: (dao: Label) => LabelEntity = (dao) => {
  return new LabelEntity(
    LabelId.from(dao.id),
    dao.name,
    dao.description,
    Color.from(dao.color),
    ProjectId.from(dao.project_id),
    LocalDateTime.from(nativeJs(dao.created_at)),
    LocalDateTime.from(nativeJs(dao.created_at)),
  );
};

type CreateLabelProps = {
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly projectId: string;
};

export const createLabelEntity: (props: CreateLabelProps) => LabelEntity = (props) => {
  const now = LocalDateTime.now();
  const color = Color.from(props.color);

  return new LabelEntity(
    LabelId.new(),
    props.name,
    props.description,
    color,
    ProjectId.from(props.projectId),
    now,
    now,
  );
};
