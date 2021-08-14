import { Body, Controller, Delete, HttpCode, Param, Post, Put } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CreateLabelRequest, UpdateLabelRequest } from 'api/dist/request/label';
import { UpdateLabelUseCase } from '@/label/model/usecase/UpdateLabelUseCase';
import { LabelResponse } from 'api/dist/response/label';
import { CreateLabelUseCase } from '@/label/model/usecase/CreateLabelUseCase';
import { DeleteLabelUseCase } from '@/label/model/usecase/DeleteLabelUseCase';
import { LabelDto } from '@/label/model/usecase/LabelDto';

@Controller('labels')
export class LabelController {
  constructor(
    readonly createLabelUseCase: CreateLabelUseCase,
    readonly updateLabelUseCase: UpdateLabelUseCase,
    readonly deleteLabelUseCase: DeleteLabelUseCase,
  ) {}

  @Post()
  create(@Body() request: CreateLabelRequest): Observable<LabelResponse> {
    return this.createLabelUseCase.exec(request).pipe(map((e) => createResponse(e)));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() request: UpdateLabelRequest): Observable<LabelResponse> {
    const props = {
      ...request,
      id,
    };

    return this.updateLabelUseCase.exec(props).pipe(map((e) => createResponse(e)));
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
  createDateTime: dto.createDateTime.toString(),
  updateDateTime: dto.updateDateTime.toString(),
});
