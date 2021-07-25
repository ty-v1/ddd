import { Label } from '@prisma/client';
import { LocalDateTime, nativeJs } from '@js-joda/core';
import { LabelEntity } from '@/label/model/entity/LabelEntity';
import { LabelId } from '@/label/model/entity/LabelId';
import { Color } from '@/label/model/entity/Color';

export const restoreLabelEntity: (dao: Label) => LabelEntity = (dao) => {
  return new LabelEntity(
    LabelId.from(dao.id),
    dao.name,
    dao.description,
    Color.from(dao.color),
    LocalDateTime.from(nativeJs(dao.created_at)),
    LocalDateTime.from(nativeJs(dao.created_at)),
  );
};
