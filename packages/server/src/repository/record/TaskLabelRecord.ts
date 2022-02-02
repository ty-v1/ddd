import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TaskRecord } from '@/repository/record/TaskRecord';

type ConstructorParams = {
  readonly taskId: string;
  readonly labelId: string;
};

@Entity('task_label')
export class TaskLabelRecord {

  constructor(params: ConstructorParams) {
    this.labelId = params.labelId;
    this.taskId = params.taskId;
  }

  @PrimaryColumn()
  readonly labelId!: string;

  @PrimaryColumn()
  readonly taskId!: string;

  @ManyToOne(() => TaskRecord, task => task.labels, {cascade: true})
  readonly task!: TaskRecord;
}
