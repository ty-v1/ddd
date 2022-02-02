import { LocalDateTime } from '@js-joda/core';
import { Color } from '@/label/model/entity/Color';
import { LabelId } from '@/label/model/entity/LabelId';

export type LabelDto = {
  readonly id: LabelId;
  readonly name: string;
  readonly color: Color;
  readonly description: string;
};
