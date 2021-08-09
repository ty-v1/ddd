import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@/repository/PrismaService';
import { DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE } from '@/shared/project/DetectProjectExistenceDomainService';
import { DetectProjectExistenceDomainServiceImpl } from '@/project/model/service/DetectProjectExistenceDomainServiceImpl';
import { ProjectModule } from '@/project/ProjectModule';

@Global()
@Module({
  imports: [ProjectModule],
  providers: [
    PrismaService,
    {
      provide: DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE,
      useClass: DetectProjectExistenceDomainServiceImpl,
    },
  ],
  exports: [DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE],
})
export class SharedModule {}
