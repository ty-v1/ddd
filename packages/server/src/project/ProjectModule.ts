import { Module } from '@nestjs/common';
import { DetectProjectDuplicationDomainService } from '@/project/model/service/DetectProjectDuplicationDomainService';
import { CreateProjectUseCase } from '@/project/usecase/CreateProjectUseCase';
import { ProjectController } from '@/project/controller/ProjectController';
import { GetProjectUseCase } from '@/project/usecase/GetProjectUseCase';
import { UpdateProjectUseCase } from '@/project/usecase/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '@/project/usecase/DeleteProjectUseCase';
import { DetectProjectExistenceDomainServiceImpl } from '@/project/model/service/DetectProjectExistenceDomainServiceImpl';

@Module({
  controllers: [ProjectController],
  providers: [
    DetectProjectDuplicationDomainService,
    DetectProjectExistenceDomainServiceImpl,
    CreateProjectUseCase,
    GetProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
  ],
  exports: [DetectProjectExistenceDomainServiceImpl],
})
export class ProjectModule {}
