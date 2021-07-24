import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectUseCase } from '@/project/usecase/CreateProjectUseCase';
import { Observable } from 'rxjs';
import { ProjectDto } from '@/project/usecase/ProjectDto';

@Controller('projects')
export class ProjectController {
  constructor(readonly createProjectUseCase: CreateProjectUseCase) {}

  @Post()
  create(@Body() a: DTO): Observable<ProjectDto> {
    return this.createProjectUseCase.exec(a);
  }
}

export type DTO = {
  name: string;
  description: string;
};
