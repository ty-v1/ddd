import { Module } from '@nestjs/common';
import { DetectProjectDuplicationDomainService } from '@/project/model/service/DetectProjectDuplicationDomainService';
import { CreateProjectUseCase } from '@/project/usecase/CreateProjectUseCase';
import { ProjectController } from '@/project/controller/ProjectController';

@Module({
  controllers: [ProjectController],
  providers: [DetectProjectDuplicationDomainService, CreateProjectUseCase],
})
export class ProjectModule {}
