import { LabelEntity } from '@/label/model/entity/LabelEntity';
import { LabelId } from '@/label/model/entity/LabelId';
import { Color } from '@/label/model/entity/Color';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { LabelRecord } from '@/repository/record/LabelRecord';

export const restoreLabelEntity: (record: LabelRecord) => LabelEntity = (record) => {
  return new LabelEntity(
    LabelId.from(record.id),
    record.name,
    record.description,
    Color.from(record.color),
    ProjectId.from(record.projectId),
  );
};

type CreateLabelProps = {
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly projectId: string;
};

export const createLabelEntity: (props: CreateLabelProps) => LabelEntity = (props) => {
  const color = Color.from(props.color);

  return new LabelEntity(
    LabelId.new(),
    props.name,
    props.description,
    color,
    ProjectId.from(props.projectId),
  );
};
