import { ulid } from 'ulid';

export class LabelId {
  private constructor(readonly value: string) {}

  static new(): LabelId {
    return new LabelId(ulid());
  }

  static from(value: string): LabelId {
    return new LabelId(value.toUpperCase());
  }
}
