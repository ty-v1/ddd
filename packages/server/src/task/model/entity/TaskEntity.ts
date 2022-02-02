import { ProjectId } from '@/project/model/entity/ProjectId';
import { TaskId } from '@/task/model/entity/TaskId';
import { Set } from 'typescript-collections';
import { LabelId } from '@/label/model/entity/LabelId';
import { LocalDateTime } from '@js-joda/core';
import { TaskStatus } from '@/task/model/entity/TaskStatus';

export class TaskEntity {
  constructor(
    readonly id: TaskId,
    private _name: string,
    private _description: string,
    readonly projectId: ProjectId,
    private readonly labelSet: Set<LabelId>,
    private _status: TaskStatus,
    readonly createDateTime: LocalDateTime,
  ) {}

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get labelIds(): Array<LabelId> {
    return this.labelSet.toArray().sort((a, b) => a.compare(b));
  }

  get status(): TaskStatus {
    return this._status;
  }

  addLabel(labelId: LabelId): void {
    this.labelSet.add(labelId);
  }

  rename(name: string): void {
    this._name = name;
  }

  changeDescription(description: string): void {
    this._description = description;
  }

  /**
   * closeする
   */
  close(): void {
    if (this._status !== TaskStatus.Done) {
      this._status = TaskStatus.Done;
    }
  }
}
