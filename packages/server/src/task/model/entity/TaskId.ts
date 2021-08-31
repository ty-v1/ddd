import { ulid } from 'ulid';
import { util } from 'typescript-collections';

export class TaskId {
  constructor(readonly value: string) {}

  static new(): TaskId {
    return new TaskId(ulid());
  }

  static from(value: string): TaskId {
    return new TaskId(value.toUpperCase());
  }

  toString(): string {
    return util.makeString(this);
  }
}
