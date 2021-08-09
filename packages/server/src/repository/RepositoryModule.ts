import { MysqlProjectRepository } from '@/repository/MysqlProjectRepository';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@/repository/PrismaService';
import { PROJECT_REPOSITORY } from '@/project/model/repository/ProjectRepository';
import { LABEL_REPOSITORY } from '@/label/model/repository/LabelRepository';
import { MysqlLabelRepository } from '@/repository/MysqlLabelRepository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: MysqlProjectRepository,
    },
    {
      provide: LABEL_REPOSITORY,
      useClass: MysqlLabelRepository,
    },
  ],
  exports: [PROJECT_REPOSITORY, LABEL_REPOSITORY],
})
export class RepositoryModule {}
