import { LocalDateTime } from '@js-joda/core';
import { ProjectResponse } from 'api';
import { ApiResponseDateTimeFormatter } from '@/util/constants';

export type Project = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createDateTime: LocalDateTime;
  readonly updateDateTime: LocalDateTime;
};

export const fromResponse: (response: ProjectResponse) => Project = (response) => ({
  id: response.id,
  name: response.name,
  description: response.description,
  createDateTime: LocalDateTime.parse(
    response.createDateTime.toISOString(),
    ApiResponseDateTimeFormatter
  ),
  updateDateTime: LocalDateTime.parse(
    response.updateDateTime.toISOString(),
    ApiResponseDateTimeFormatter
  ),
});
