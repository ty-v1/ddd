import { Module } from '@nestjs/common';
import { CreateLabelUseCase } from '@/label/model/usecase/CreateLabelUseCase';
import { UpdateLabelUseCase } from '@/label/model/usecase/UpdateLabelUseCase';
import { DeleteLabelUseCase } from '@/label/model/usecase/DeleteLabelUseCase';
import { DetectLabelDuplicationDomainService } from '@/label/model/service/DetectLabelDuplicationDomainService';
import { LabelController } from '@/label/controller/LabelController';

@Module({
  controllers: [LabelController],
  providers: [CreateLabelUseCase, UpdateLabelUseCase, DeleteLabelUseCase, DetectLabelDuplicationDomainService],
  exports: [],
})
export class LabelModule {}
