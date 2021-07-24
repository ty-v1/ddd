import { ProjectId } from '@/project/model/entity/ProjectId';
import { LocalDateTime } from '@js-joda/core';

export class ProjectEntity {
  constructor(
    readonly id: ProjectId,
    private _name: string,
    private _description: string,
    readonly createDateTime: LocalDateTime,
    readonly updateDateTime: LocalDateTime,
  ) {}

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  rename(name: string): void {
    this._name = name;
  }

  changeDescription(description: string): void {
    this._description = description;
  }
}
