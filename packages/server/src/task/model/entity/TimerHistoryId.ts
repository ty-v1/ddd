import { ulid } from 'ulid';
import { util } from 'typescript-collections';

export class TimerHistoryId {
  constructor(readonly value: string) {}

  static new(): TimerHistoryId {
    return new TimerHistoryId(ulid());
  }

  static from(value: string): TimerHistoryId {
    return new TimerHistoryId(value.toUpperCase());
  }

  toString(): string {
    return util.makeString(this);
  }
}
