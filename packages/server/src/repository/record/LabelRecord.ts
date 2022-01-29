import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { LabelEntity } from '@/label/model/entity/LabelEntity';

type LabelConstructorParams = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly color: string;
};

@Entity('label')
export class LabelRecord {

  static from(entity: LabelEntity): LabelRecord {
    return new LabelRecord({
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
      color: entity.color.rgb,
    });
  }

  constructor(params: LabelConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.color = params.color;
  }

  @PrimaryColumn()
  readonly id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  color!: string;

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
