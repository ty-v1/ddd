import { TaskResponse } from 'api';
import { ChronoUnit, Duration, LocalDateTime } from '@js-joda/core';
import { ApiResponseDateTimeFormatter } from '@/util/constants';

// ToDo ラベル
export type TaskDto = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: TaskStatus;
  readonly estimatedTime: Duration;
  readonly elapsedTime: Duration;
  readonly createDate: LocalDateTime;
}

export type TaskStatus = 'todo' | 'doing' | 'done';

export const fromResponse: (response: TaskResponse) => TaskDto = (response) => {
  return {
    id: response.id,
    description: response.description,
    name: response.name,
    elapsedTime: Duration.of(response.elapsedTime, ChronoUnit.SECONDS),
    estimatedTime: Duration.of(response.estimatedTime, ChronoUnit.SECONDS),
    status: response.status,
    createDate: LocalDateTime.parse(
      response.createDateTime.toISOString(),
      ApiResponseDateTimeFormatter
    ),
  };
};
