import { Global, Module } from '@nestjs/common';
import { DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE } from '@/shared/project/DetectProjectExistenceDomainService';
import {
  DetectProjectExistenceDomainServiceImpl
} from '@/project/model/service/DetectProjectExistenceDomainServiceImpl';

@Global()
@Module({
  providers: [
    {
      provide: DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE,
      useClass: DetectProjectExistenceDomainServiceImpl,
    },
  ],
  exports: [DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE],
})
export class SharedModule {}
