import { MysqlProjectRepository } from '@/repository/MysqlProjectRepository';
import { Global, Module } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '@/project/model/repository/ProjectRepository';
import { LABEL_REPOSITORY } from '@/label/model/repository/LabelRepository';
import { MysqlLabelRepository } from '@/repository/MysqlLabelRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelRecord } from '@/repository/record/LabelRecord';
import { ProjectRecord } from '@/repository/record/ProjectRecord';
import { TaskLabelRecord } from '@/repository/record/TaskLabelRecord';
import { TaskRecord } from '@/repository/record/TaskRecord';
import { TASK_REPOSITORY } from '@/task/model/repository/TaskRepository';
import { MysqlTaskRepository } from '@/repository/MysqlTaskRepository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LabelRecord, ProjectRecord, TaskLabelRecord, TaskRecord])],
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: MysqlProjectRepository,
    },
    {
      provide: LABEL_REPOSITORY,
      useClass: MysqlLabelRepository,
    },
    {
      provide: TASK_REPOSITORY,
      useClass: MysqlTaskRepository,
    },
  ],
  exports: [PROJECT_REPOSITORY, LABEL_REPOSITORY, TASK_REPOSITORY],
})
export class RepositoryModule {
}
