import { Color } from '@/label/model/entity/Color';
import { LabelId } from '@/label/model/entity/LabelId';
import { ProjectId } from '@/project/model/entity/ProjectId';

export class LabelEntity {
  constructor(
    readonly id: LabelId,
    private _name: string,
    private _description: string,
    private _color: Color,
    readonly projectId: ProjectId,
  ) {
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get color(): Color {
    return this._color;
  }

  update(props: { readonly name?: string, readonly description?: string, readonly color?: Color }): void {
    this._name = props.name ?? this._name;
    this._color = props.color ?? this._color;
    this._description = props.description ?? this._description;
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

  isSame(name: string, color: Color): boolean {
    return this._name === name && this._color.rgb === color.rgb;
  }
}
