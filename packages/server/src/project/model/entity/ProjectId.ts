import { ulid } from 'ulid';
import { util } from 'typescript-collections';

export class ProjectId {
  constructor(readonly value: string) {}

  static new(): ProjectId {
    return new ProjectId(ulid());
  }

  static from(value: string): ProjectId {
    return new ProjectId(value.toUpperCase());
  }

  toString(): string {
    return util.makeString(this);
  }
}
