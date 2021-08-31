import { ProjectId } from '@/project/model/entity/ProjectId';
import { TaskId } from '@/task/model/entity/TaskId';
import { Set } from 'typescript-collections';
import { LabelId } from '@/label/model/entity/LabelId';
import { LocalDateTime } from '@js-joda/core';
import { TaskStatus } from '@/task/model/entity/TaskStatus';
import { Timer } from '@/task/model/entity/Timer';
import { TimerHistory } from '@/task/model/entity/TimerHistory';

export class TaskEntity {
  constructor(
    readonly id: TaskId,
    private _name: string,
    private _description: string,
    readonly projectId: ProjectId,
    private readonly labelSet: Set<LabelId>,
    private _status: TaskStatus,
    private readonly timer: Timer,
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

  get histories(): readonly TimerHistory[] {
    return this.timer.histories;
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
   * 再開する
   */
  resume(): void {
    if (this._status === TaskStatus.InProgress || this._status === TaskStatus.InReview) {
      this.timer.resume();
    }
  }

  /**
   * 一時停止する
   */
  suspend(): void {
    if (this._status === TaskStatus.InProgress || this._status === TaskStatus.InReview) {
      this.timer.suspend();
    }
  }

  /**
   * タスクを開始する
   */
  run(): void {
    if (this._status === TaskStatus.ToDo) {
      this._status = TaskStatus.InProgress;
      this.timer.start();
    }
  }

  /**
   * タスクをレビュー中にする
   */
  submitReview(): void {
    if (this._status === TaskStatus.InProgress) {
      this._status = TaskStatus.InReview;
      this.timer.resume();
    }
  }

  /**
   * closeする
   */
  close(): void {
    if (this._status !== TaskStatus.Done) {
      this._status = TaskStatus.Done;
      this.timer.stop();
    }
  }
}
