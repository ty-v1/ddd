import { ulid } from 'ulid';

export class ProjectId {
  constructor(readonly value: string) {}

  static new(): ProjectId {
    return new ProjectId(ulid());
  }

  static from(value: string): ProjectId {
    return new ProjectId(value.toUpperCase());
  }
}
