import { LabelRepository } from '@/label/model/repository/LabelRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/repository/PrismaService';
import { LabelId } from '@/label/model/entity/LabelId';
import { from, map, mergeAll, Observable } from 'rxjs';
import { LabelEntity } from '@/label/model/entity/LabelEntity';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { isNil } from 'lodash-es';
import { restoreLabelEntity } from '@/label/model/entity/LabelFactory';
import { convert, LocalDateTime } from '@js-joda/core';
import { Color } from '@/label/model/entity/Color';

@Injectable()
export class MysqlLabelRepository implements LabelRepository {
  constructor(private readonly prisma: PrismaService) {}

  delete(id: LabelId): Observable<void> {
    const query = this.prisma.label.delete({ where: { id: id.value } });
    return from(query).pipe(map(() => void 0));
  }

  findById(id: LabelId): Observable<LabelEntity | undefined> {
    const query = this.prisma.label.findUnique({
      where: {
        id: id.value,
      },
      include: {
        project: false,
      },
    });

    return from(query).pipe(
      map((e) => {
        if (isNil(e)) {
          return undefined;
        }

        return restoreLabelEntity(e);
      }),
    );
  }

  findByProjectId(id: ProjectId): Observable<LabelEntity> {
    const query = this.prisma.label.findMany({
      where: {
        project_id: id.value,
      },
      include: {
        project: false,
      },
    });

    return from(query).pipe(
      mergeAll(),
      map((e) => restoreLabelEntity(e)),
    );
  }

  save(entity: LabelEntity): Observable<LabelEntity> {
    const query = this.prisma.label.create({
      data: {
        id: entity.id.value,
        project_id: entity.projectId.value,
        name: entity.name,
        description: entity.description,
        color: entity.color.rgb,
        created_at: convert(entity.createDateTime).toDate(),
        updated_at: convert(entity.updateDateTime).toDate(),
        is_default: false,
      },
    });

    return from(query).pipe(map((e) => restoreLabelEntity(e)));
  }

  update(entity: LabelEntity): Observable<LabelEntity> {
    const query = this.prisma.label.update({
      where: {
        id: entity.id.value,
      },
      data: {
        name: entity.name,
        description: entity.description,
        color: entity.color.rgb,
        updated_at: convert(LocalDateTime.now()).toDate(),
      },
    });

    return from(query).pipe(map((e) => restoreLabelEntity(e)));
  }

  existsSameLabel(projectId: ProjectId, color: Color, name: string): Observable<boolean> {
    const query = this.prisma.label.count({
      where: {
        name,
        project_id: projectId.value,
        color: color.rgb,
      },
    });

    return from(query).pipe(map((e) => e > 0));
  }
}
