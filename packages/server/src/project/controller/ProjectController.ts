import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectUseCase, ProjectDto } from '@/project/usecase/CreateProjectUseCase';
import { Observable } from 'rxjs';

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
