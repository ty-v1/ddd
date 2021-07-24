import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateProjectUseCase } from '@/project/usecase/CreateProjectUseCase';
import { map, Observable } from 'rxjs';
import { ProjectDto } from '@/project/usecase/ProjectDto';
import { CreateProjectRequest, UpdateProjectRequest } from 'api/dist/request/project';
import { ProjectResponse } from 'api/dist/response/project';
import { UpdateProjectUseCase } from '@/project/usecase/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '@/project/usecase/DeleteProjectUseCase';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { GetProjectUseCase } from '@/project/usecase/GetProjectUseCase';

@Controller('projects')
export class ProjectController {
  constructor(
    readonly getProjectUseCase: GetProjectUseCase,
    readonly createProjectUseCase: CreateProjectUseCase,
    readonly updateProjectUseCase: UpdateProjectUseCase,
    readonly deleteProjectUseCase: DeleteProjectUseCase,
  ) {}

  @Post()
  create(@Body() request: CreateProjectRequest): Observable<ProjectResponse> {
    return this.createProjectUseCase.exec(request).pipe(map((e) => createResponse(e)));
  }

  @Get(':id')
  get(@Param('id') id: string): Observable<ProjectResponse> {
    return this.getProjectUseCase.exec({ id: ProjectId.from(id) }).pipe(map((e) => createResponse(e)));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() request: UpdateProjectRequest): Observable<ProjectResponse> {
    const props = {
      ...request,
      id: ProjectId.from(id),
    };

    return this.updateProjectUseCase.exec(props).pipe(map((e) => createResponse(e)));
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Observable<void> {
    return this.deleteProjectUseCase.exec({ id: ProjectId.from(id) });
  }
}

const createResponse: (dto: ProjectDto) => ProjectResponse = (dto) => ({
  id: dto.id.value,
  name: dto.name,
  description: dto.description,
  createDateTime: dto.createDateTime.toString(),
  updateDateTime: dto.updateDateTime.toString(),
});
