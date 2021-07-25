import { ProjectId } from '@/project/model/entity/ProjectId';
import { LocalDateTime } from '@js-joda/core';
import { Color } from '@/label/model/entity/Color';

export class LabelEntity {
  constructor(
    readonly id: ProjectId,
    private _name: string,
    private _description: string,
    private _color: Color,
    readonly createDateTime: LocalDateTime,
    readonly updateDateTime: LocalDateTime,
  ) {}

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get color(): Color {
    return this._color;
  }

  rename(name: string): void {
    this._name = name;
  }

  changeDescription(description: string): void {
    this._description = description;
  }

  changeColor(color: Color): void {
    this._color = color;
  }
}