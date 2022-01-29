import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ProjectEntity } from '@/project/model/entity/ProjectEntity';

type ConstructorParams = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
};

@Entity('project')
export class ProjectRecord {

  static from(entity: ProjectEntity): ProjectRecord {
    return new ProjectRecord({
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
    });
  }

  constructor(params: ConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
  }

  @PrimaryColumn()
  readonly id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

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
