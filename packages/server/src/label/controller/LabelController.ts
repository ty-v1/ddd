import { Body, Controller, Delete, HttpCode, Param, Post, Put } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CreateLabelRequest, LabelResponse, UpdateLabelRequest } from 'api';
import { UpdateLabelUseCase } from '@/label/model/usecase/UpdateLabelUseCase';
import { CreateLabelUseCase } from '@/label/model/usecase/CreateLabelUseCase';
import { DeleteLabelUseCase } from '@/label/model/usecase/DeleteLabelUseCase';
import { LabelDto } from '@/label/model/usecase/LabelDto';

@Controller('projects/:projectId/labels')
export class LabelController {
  constructor(
    readonly createLabelUseCase: CreateLabelUseCase,
    readonly updateLabelUseCase: UpdateLabelUseCase,
    readonly deleteLabelUseCase: DeleteLabelUseCase,
  ) {
  }

  @Post()
  create(
    @Param('projectId') projectId: string,
    @Body() request: CreateLabelRequest
  ): Observable<LabelResponse> {
    return this.createLabelUseCase.exec({
      description: '',
      projectId,
      ...request,
    })
      .pipe(map((e) => createResponse(e)));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @Body() request: UpdateLabelRequest
  ): Observable<LabelResponse> {
    return this.updateLabelUseCase.exec({
        ...request,
        id,
        projectId
      }
    ).pipe(map((e) => createResponse(e)));
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Observable<void> {
    return this.deleteLabelUseCase.exec({ id });
  }
}

const createResponse: (dto: LabelDto) => LabelResponse = (dto) => ({
  id: dto.id.value,
  name: dto.name,
  description: dto.description,
  color: dto.color.rgb,
});
