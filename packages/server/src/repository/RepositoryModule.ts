import { MysqlProjectRepository } from '@/repository/MysqlProjectRepository';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@/repository/PrismaService';
import { PROJECT_REPOSITORY } from '@/project/model/repository/ProjectRepository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: MysqlProjectRepository,
    },
  ],
  exports: [PROJECT_REPOSITORY],
})
export class RepositoryModule {}
