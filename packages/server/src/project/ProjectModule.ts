import { Module } from '@nestjs/common';
import { DetectProjectDuplicationDomainService } from '@/project/model/service/DetectProjectDuplicationDomainService';
import { CreateProjectUseCase } from '@/project/usecase/CreateProjectUseCase';
import { ProjectController } from '@/project/controller/ProjectController';
import { GetProjectUseCase } from '@/project/usecase/GetProjectUseCase';
import { UpdateProjectUseCase } from '@/project/usecase/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '@/project/usecase/DeleteProjectUseCase';

@Module({
  controllers: [ProjectController],
  providers: [
    DetectProjectDuplicationDomainService,
    CreateProjectUseCase,
    GetProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
  ],
})
export class ProjectModule {}
