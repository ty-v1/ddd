export type Task = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly status: TaskStatus;
}

export type TaskStatus = 'ToDo' | 'Doing' | 'Done';
