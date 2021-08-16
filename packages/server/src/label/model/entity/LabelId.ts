import { ulid } from 'ulid';

export class LabelId {
  private constructor(readonly value: string) {}

  static new(): LabelId {
    return new LabelId(ulid());
  }

  static from(value: string): LabelId {
    return new LabelId(value.toUpperCase());
  }

  compare(labelId: LabelId): number {
    if (this.value < labelId.value) {
      return -1;
    } else if (this.value > labelId.value) {
      return 1;
    } else {
      return 0;
    }
  }
}
