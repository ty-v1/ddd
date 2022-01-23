import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { TaskEntity } from '@/task/model/entity/TaskEntity';
import { TaskLabelRecord } from '@/repository/record/TaskLabelRecord';

type ConstructorParams = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: number;
  readonly labelIds: string[];
};

@Entity('task')
export class TaskRecord {

  static from(entity: TaskEntity): TaskRecord {
    return new TaskRecord({
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      labelIds: entity.labelIds.map(e => e.value)
    });
  }

  constructor(params: ConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.status = params.status;
    this.labels = params.labelIds.map(e => {
      return new TaskLabelRecord({
        taskId: params.id,
        labelId: e
      });
    });
  }

  @PrimaryColumn()
  readonly id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  status!: number;

  @OneToMany(() => TaskLabelRecord, taskLabel => taskLabel.task)
  @JoinTable()
  labels!: Readonly<TaskLabelRecord>[];

  @Column({ name: 'project_id', })
  readonly projectId!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt!: Date;
}
