import { LabelRepository } from '@/label/model/repository/LabelRepository';
import { Injectable } from '@nestjs/common';
import { LabelId } from '@/label/model/entity/LabelId';
import { from, map, mergeAll, Observable } from 'rxjs';
import { LabelEntity } from '@/label/model/entity/LabelEntity';
import { ProjectId } from '@/project/model/entity/ProjectId';
import { isNil } from 'lodash';
import { restoreLabelEntity } from '@/label/model/entity/LabelFactory';
import { InjectRepository } from '@nestjs/typeorm';
import { LabelRecord } from '@/repository/record/LabelRecord';
import { Repository } from 'typeorm';

@Injectable()
export class MysqlLabelRepository implements LabelRepository {
  constructor(
    @InjectRepository(LabelRecord)
    private labelDao: Repository<LabelRecord>,
  ) {
  }

  delete(id: LabelId): Observable<void> {
    const query = this.labelDao.delete(id.value);
    return from(query).pipe(map(() => void 0));
  }

  findById(id: LabelId): Observable<LabelEntity | undefined> {
    const query = this.labelDao.findOne(id.value);

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
    const query = this.labelDao.find({
      projectId: id.value
    });

    return from(query).pipe(
      mergeAll(),
      map((e) => restoreLabelEntity(e)),
    );
  }

  save(entity: LabelEntity): Observable<LabelEntity> {
    const query = this.labelDao.save(LabelRecord.from(entity));
    return from(query).pipe(map((e) => restoreLabelEntity(e)));
  }

  update(entity: LabelEntity): Observable<LabelEntity> {
    const query = this.labelDao.save(LabelRecord.from(entity));
    return from(query).pipe(map((e) => restoreLabelEntity(e)));
  }

  existsSameLabel(props: {
    readonly id?: LabelId,
    readonly projectId: ProjectId,
    readonly name: string
  }): Observable<boolean> {

    const query = this.labelDao.findOne({
      where: {
        name: props.name,
        projectId: props.projectId.value,
      },
    });

    return from(query).pipe(map((record) => {
      if (record === undefined) {
        return false;
      }

      if (props.id === undefined) {
        return true;
      }

      return record.id !== props.id.value;
    }));
  }
}
