import { ulid } from 'ulid';
import { isValidUlid } from '@/util/ulid';

export class ProjectId {
  constructor(readonly value: string) {}

  static new(): ProjectId {
    return {
      value: ulid(),
    };
  }

  static from(value: string): ProjectId {
    return new ProjectId(value.toUpperCase());
  }
}
