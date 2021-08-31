import { ProjectId } from '@/project/model/entity/ProjectId';
import { Observable } from 'rxjs';

export interface DetectProjectExistenceDomainService {
  exec(projectId: ProjectId): Observable<boolean>;
}

export const DETECT_PROJECT_EXISTENCE_DOMAIN_SERVICE = 'DetectProjectExistenceDomainService';
