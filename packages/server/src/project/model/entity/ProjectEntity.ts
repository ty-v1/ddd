import { ProjectId } from '@/project/model/entity/ProjectId';
import { LocalDateTime } from '@js-joda/core';

export class ProjectEntity {
  constructor(
    readonly id: ProjectId,
    private _name: string,
    private _description: string,
    readonly createDateTime: LocalDateTime,
    readonly updateDateTime: LocalDateTime,
  ) {
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  update(props: { readonly name?: string, readonly description?: string }): void {
    this._name = props.name ?? this._name;
    this._description = props.description ?? this._description;
  }
}
